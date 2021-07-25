const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getPeriodSlots(schoolid, level) {
  const periods = await prisma.period_time.findMany({
    where: {
      school_id: parseInt(schoolid),
      period_time_section: level,
    },
    select: {
      id: true,
      starttime: true,
      endtime: true,
    },
  });
  console.log(periods);
  if (!periods) throw { status: 404, message: "Details Not Found" };
  return periods;
}

async function addPeriod(data) {
  console.log(data);
  const period = await prisma.period_time.create({
    data: {
      starttime: data.starttime,
      endtime: data.endtime,
      period_time_section: data.section,
      school_id: 1,
    },
  });
  console.log(period);
  if (!period) throw { status: 500, message: "Process Failed" };
  return period;
}

async function deletePeriod(psid) {
  const deletedperiod = await prisma.period_time.delete({
    where: {
      id: psid,
    },
  });
  if (!deletedperiod) throw { status: 500, message: "Process Failed" };
  return deletedperiod;
}

async function patchPeriod(psid, data) {
  const patchedperiod = await prisma.period_time.update({
    where: {
      id: psid,
    },
    data: {
      starttime: data.starttime,
      endtime: data.endtime,
    },
  });
  if (!patchedperiod) throw { status: 500, message: "Process Failed" };
  return patchedperiod;
}

const classservice = {
  getPeriodSlots,
  addPeriod,
  deletePeriod,
  patchPeriod,
};

module.exports = classservice;
