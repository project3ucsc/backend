const { PrismaClient } = require("@prisma/client");
const timeslotservice = require("./timeslot.service");
const notificationservice = require("./notification.service");
const prisma = new PrismaClient();

const enum_releifStatus = {
  pending: "a",
  active: "b",
  rejected: "c",
  expried: "d",
};

async function addLeave({ date, reason }) {
  const newleave = await prisma.leave.create({
    data: { from_day: date[0], to_day: date[1], reason: reason, type: "s" },
  });
  if (!newleave) throw { status: 500, message: "Process failed" };

  return newleave;
}

async function addleaveNreleif({ date, timeslots, reason, schoolid }) {
  const newleave = await prisma.leave.create({
    data: { from_day: date, reason: reason, type: "s" },
  });
  if (!newleave) throw { status: 500, message: "Process failed" };

  await timeslots.forEach(async (tsid) => {
    const ts = await prisma.time_slot.findFirst({
      where: { id: tsid },
      select: {
        teacher_id: true,
        peroid_id: true,
        weekday: true,
        subject_detail: {
          select: { id: true, subject: true },
        },
      },
    });
    console.log("ts", ts);

    const teachers_who_do_same_sub = await prisma.subject_detail.findMany({
      where: {
        classroom: { school_id: schoolid },
        subject: { name: ts.subject_detail.subject.name },
      },
      select: { teacher_id: true },
      distinct: ["teacher_id"],
    });
    console.log("teachers", teachers_who_do_same_sub);
    teachers_who_do_same_sub.forEach(async ({ teacher_id }) => {
      if (teacher_id !== ts.teacher_id) {
        const { peroid_id, weekday } = ts;

        const isConflicts = await timeslotservice.isConflictsWithTeacher(
          { teacher_id, period_id: peroid_id, weekday },
          schoolid
        );
        console.log(isConflicts);
        if (!isConflicts) {
          console.log("newrel");
          const newrel = await prisma.relief_period.create({
            data: {
              leave_id: newleave.id,
              tsid: tsid,
              sdid: ts.subject_detail.id,
              teacher_id: teacher_id,
            },
          });
          if (!newrel) throw { status: 500, message: "Process failed" };

          const title = "New relief class request";
          const discription =
            "You have receieved a relief class reques on " +
            newleave.from_day.toDateString();

          await notificationservice.addNotification({
            title,
            discription,
            to: teacher_id,
            onClickTo: "/ReliefManagement",
            type: "a",
          });
        }
      }
    });
  });

  console.log("------------------");
}

async function getTimeslotsDayForTeacher(userid, day) {
  const tss = await prisma.time_slot.findMany({
    where: { teacher_id: userid, weekday: day },
    select: {
      id: true,
      subject_detail: {
        select: {
          classroom: { select: { grade: true, name: true } },
          subject: { select: { name: true } },
        },
      },
    },
  });

  let mappedtss = tss.map((ts) => {
    return {
      id: ts.id,
      name: `${ts.subject_detail.classroom.grade}-${ts.subject_detail.classroom.name} - ${ts.subject_detail.subject.name}`,
    };
  });
  // if (!del) throw { status: 404, message: "Process failed" };
  return mappedtss;
}

async function getAllReleifs(userid) {
  const rels = await prisma.relief_period.findMany({
    where: { teacher_id: userid },
    select: {
      id: true,
      status: true,
      sdid: true,
      subject_detail: { select: { classroom: true, subject: true } },
      leave: { select: { from_day: true } },
    },
  });

  let mappedrels = rels.map((r) => {
    return {
      id: r.id,
      // sdid: r.sdid,
      title: `${r.subject_detail.classroom.grade}-${r.subject_detail.classroom.name} - ${r.subject_detail.subject.name}`,
      date: r.leave.from_day.toLocaleDateString(),
      status: r.status,
    };
  });
  // if (!del) throw { status: 404, message: "Process failed" };
  return mappedrels;
}

async function getRelifSdid(id) {
  const rel = await prisma.relief_period.findFirst({
    where: { id: id, status: enum_releifStatus.active },
    select: {
      id: true,
      sdid: true,
    },
  });
  if (!rel) throw { status: 403, message: "Unauthorized" };
  return rel;
}
async function getAllReleifbyId(id) {
  const rel = await prisma.relief_period.findFirst({
    where: { id: id },
    select: {
      id: true,
      status: true,
      subject_detail: {
        select: { id: true, classroom: true, subject: true, teacher: true },
      },
      leave: true,
    },
  });
  const ts = await prisma.time_slot.findFirst({
    where: {
      sdid: rel.subject_detail.id,
      weekday: rel.leave.from_day.getDay(),
    },
    select: { period_time: true },
  });

  let mappedrel = {
    id: rel.id,
    classname: `${rel.subject_detail.classroom.grade}-${rel.subject_detail.classroom.name}`,
    subname: rel.subject_detail.subject.name,
    teachername: rel.subject_detail.teacher.username,
    date: rel.leave.from_day.toLocaleDateString(),
    time: `${ts.period_time.starttime.toLocaleTimeString()} - ${ts.period_time.endtime.toLocaleTimeString()}`,
    status: rel.status,
  };

  // if (!del) throw { status: 404, message: "Process failed" };
  return mappedrel;
}

async function setStatus({ id, status }) {
  const up = await prisma.relief_period.update({
    where: { id: id },
    data: { status: status },
  });
  if (!up) throw { status: 404, message: "Process failed" };
  return up;
}

async function checkRelifinStudent(tsid, sdid) {
  const rel = await prisma.relief_period.findFirst({
    where: { tsid: tsid, sdid: sdid, status: enum_releifStatus.active },
    select: {
      id: true,
      sdid: true,
      teacher: { select: { username: true } },
      leave: { select: { from_day: true } },
    },
  });
  if (!rel) throw { status: 404, message: "not found" };

  const today = new Date("2021-09-21");
  const isRel =
    today.toLocaleDateString() === rel.leave.from_day.toLocaleDateString();
  if (isRel) {
    return `Today online meeting conducted by ${rel.teacher.username} (Relief teacher)`;
  } else {
    if (today > rel.leave.from_day) {
      await setStatus({ id: rel.id, status: enum_releifStatus.expried });
    }
    return "";
  }
}

async function getNotifications(id) {
  const notis = await prisma.notification.findMany({ where: { to: id } });
  // if (!del) throw { status: 404, message: "Process failed" };
  return notis;
}

const reliefservice = {
  getNotifications,
  getTimeslotsDayForTeacher,
  getAllReleifs,
  getAllReleifbyId,
  getRelifSdid,
  addleaveNreleif,
  addLeave,
  setStatus,
  checkRelifinStudent,
};

module.exports = reliefservice;
