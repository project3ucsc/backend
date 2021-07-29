const { sectionmap } = require("../helpers/config");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
      school_id: 1,
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
  console.log(overlaps);

  const conflicts = await prisma.time_slot.findMany({
    where: {
      teacher_id: data.teacher_id,
      weekday: data.weekday,
      peroid_id: {
        in: overlaps,
      },
    },
  });

  console.log(conflicts);

  return conflicts.length !== 0;
}

const timeslotservice = {
  getTimeSlotsForSclAdmin,
  createTimeslot,
  updateTimeslot,
};

module.exports = timeslotservice;
