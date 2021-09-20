const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { sectionmap } = require("../helpers/config");

function getDateTxt(st, et) {
  const timeoptions = {
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
  };
  return `${st.toLocaleTimeString([], timeoptions)} - ${et.toLocaleTimeString(
    [],
    timeoptions
  )}`;
}

async function getTimeSlotsForStudent(schoolid, studentid) {
  // const grade = "G12MATH";
  const studentdetail = await prisma.studentdetail.findFirst({
    where: {
      user_id: studentid,
    },
    select: {
      classroom: {
        select: {
          id: true,
          grade: true,
        },
      },
    },
  });
  if (!studentdetail)
    throw { status: 500, message: "StudentDetails Not Found" };

  // console.log(studentdetail);

  const section = sectionmap.get(studentdetail.classroom.grade);
  // get the periods in school , section
  const periods = await prisma.period_time.findMany({
    where: {
      school_id: schoolid,
      period_time_section: section,
    },
    select: {
      id: true,
      starttime: true,
      endtime: true,
    },
    orderBy: {
      starttime: "asc",
    },
  });
  if (!periods) throw { status: 500, message: "Periods Not Found" };

  var timeslotdata = [];
  // get the timeslot for each periods (max timeslot - 5)
  for (let index = 0; index < periods.length; index++) {
    const period = periods[index];
    const timeslots = await prisma.time_slot.findMany({
      where: {
        peroid_id: period.id,
        class_id: studentdetail.classroom.id,
      },
      select: {
        weekday: true,
        subject_detail: {
          select: {
            subject: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: {
        weekday: "asc",
      },
    });
    timeslotdata.push({ period, timeslots });
  }

  return timeslotdata;
}

async function getTimeSlotsForSclAdmin(schoolid, grade, classname) {
  // const grade = "G12MATH";

  const classdetail = await prisma.classroom.findFirst({
    where: {
      AND: {
        school_id: schoolid,
        grade: grade,
        name: classname,
      },
    },
    select: {
      id: true,

      subject_detail: {
        select: {
          id: true,
          teacher_id: true,
          subject: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const section = sectionmap.get(grade);

  // get the periods in school , section
  const periods = await prisma.period_time.findMany({
    where: {
      school_id: schoolid,
      period_time_section: section,
    },
    select: {
      id: true,
      starttime: true,
      endtime: true,
    },
    orderBy: {
      starttime: "asc",
    },
  });
  // console.log(periods);

  var timeslotdata = [];

  // get the timeslot for each periods (max timeslot - 5)
  for (let index = 0; index < periods.length; index++) {
    const period = periods[index];
    const timeslots = await prisma.time_slot.findMany({
      where: {
        peroid_id: period.id,
        class_id: classdetail.id,
      },
      select: {
        id: true,
        teacher_id: true,
        sdid: true,
        weekday: true,
      },
      orderBy: {
        weekday: "asc",
      },
    });
    timeslotdata.push({ period, timeslots });
  }
  const data = { classdetail, timeslotdata };
  console.log(data);

  // if (!periods) throw { status: 404, message: "Details Not Found" };
  return data;
}

async function getTimeSlotsForTeacher(teacherid) {
  const data = await prisma.time_slot.findMany({
    where: { teacher_id: teacherid },
    select: {
      classroom: { select: { grade: true, name: true } },
      subject_detail: {
        select: { id: true, subject: { select: { name: true } } },
      },
      period_time: { select: { starttime: true, endtime: true } },
      weekday: true,
    },
  });
  const mappeddata = data.map((d) => {
    return {
      name: `${d.classroom.grade}-${d.classroom.name} | ${d.subject_detail.subject.name}`,
      time: getDateTxt(d.period_time.starttime, d.period_time.endtime),
      day: d.weekday,
      sdid: d.subject_detail.id,
    };
  });
  console.log(mappeddata);

  return mappeddata;
}

async function createTimeslot(data, schoolid) {
  const isConflicts = await isConflictsWithTeacher(data, schoolid);

  if (!isConflicts) {
    const newts = await prisma.time_slot.create({
      data: {
        teacher_id: data.teacher_id,
        weekday: data.weekday,
        class_id: data.class_id,
        peroid_id: data.period_id,
        sdid: data.sd_id,
      },
    });
    return newts;
  } else {
    throw {
      status: 500,
      message:
        "Cannot assign the timeslot because teacher has a another subject to teach at this time",
    };
  }
}

async function updateTimeslot(data, schoolid, ts_id) {
  const isConflicts = await isConflictsWithTeacher(data, schoolid);

  if (!isConflicts) {
    const newts = await prisma.time_slot.update({
      where: {
        id: ts_id,
      },
      data: {
        teacher_id: data.teacher_id,
        weekday: data.weekday,
        class_id: data.class_id,
        peroid_id: data.period_id,
        sdid: data.sd_id,
      },
    });
    return newts;
  } else {
    throw {
      status: 500,
      message:
        "Cannot assign the timeslot because teacher has a another subject to teach at this time",
    };
  }
}

async function isConflictsWithTeacher(data, schoolid) {
  const currntperiod = await prisma.period_time.findFirst({
    where: {
      id: data.period_id,
    },
    select: {
      id: true,
      starttime: true,
      endtime: true,
    },
  });

  const allperiods = await prisma.period_time.findMany({
    where: {
      school_id: schoolid,
    },
    select: {
      id: true,
      starttime: true,
      endtime: true,
    },
  });

  // find overlapping periods in different sections
  var overlaps = [];
  allperiods.forEach((peroid) => {
    const ps = peroid.starttime.getTime();
    const pe = peroid.endtime.getTime();
    const cs = currntperiod.starttime.getTime();
    const ce = currntperiod.endtime.getTime();
    if (!((ce <= ps && ce < pe) || (cs > ps && cs >= pe))) {
      overlaps.push(peroid.id);
    }
  });
  console.log("overlaps", overlaps);

  const conflicts = await prisma.time_slot.findFirst({
    where: {
      teacher_id: data.teacher_id,
      weekday: data.weekday,
      peroid_id: {
        in: overlaps,
      },
    },
  });

  console.log("conflicts", conflicts);

  return conflicts !== null;
}

async function deleteTimeslot(ts_id) {
  const deletedts = await prisma.time_slot.delete({
    where: {
      id: ts_id,
    },
  });
  return deletedts;
}

const timeslotservice = {
  getTimeSlotsForSclAdmin,
  getTimeSlotsForStudent,
  getTimeSlotsForTeacher,
  createTimeslot,
  updateTimeslot,
  deleteTimeslot,

  isConflictsWithTeacher,
};

module.exports = timeslotservice;
