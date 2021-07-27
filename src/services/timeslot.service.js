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

async function createTimeslot(schoolid, level) {
  const periods = await prisma.period_time.findMany({});
}

const timeslotservice = {
  getTimeSlotsForSclAdmin,
  createTimeslot,
};

module.exports = timeslotservice;
