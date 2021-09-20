const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const enum_submissionStatus = {
  noattempt: "na",
  submitearly: "se",
  submitlate: "ls",
};

async function getAssmnts(sdid) {
  const assmnts = await prisma.assmnt.findMany({
    where: { sdid: parseInt(sdid) },
  });
  return assmnts;
}

async function getAssmntTimeline(classid, userid) {
  const assmnts = await prisma.assmnt.findMany({
    where: { sdid: parseInt(sdid) },
  });
  return assmnts;
}

async function getAssmntByID(assid) {
  const assmnts = await prisma.assmnt.findFirst({
    where: { id: parseInt(assid) },
  });

  if (!assmnts) throw { status: 404, message: "No assessment found" };
  return assmnts;
}

async function getAssmntByIdWithSubmisstion(assid, stuid) {
  const assmnt = await prisma.assmnt.findFirst({
    where: { id: parseInt(assid) },
  });
  if (!assmnt) throw { status: 404, message: "No assessment found" };

  let submission = await prisma.submission.findFirst({
    where: { assid: parseInt(assid), stuid: parseInt(stuid) },
  });
  let status = enum_submissionStatus.noattempt;
  if (!submission) submission = { id: -1, filename: "NA" };
  else {
    status =
      submission.submitdate < assmnt.duedate
        ? enum_submissionStatus.submitearly
        : enum_submissionStatus.submitlate;
    if (submission.filename === "NA") {
      status = enum_submissionStatus.noattempt;
    }
  }
  submission = { ...submission, status: status };

  return { assmnt, submission };
}

async function addAssmnt(data) {
  const assmnt = await prisma.assmnt.create({
    data: {
      title: data.title,
      discription: data.discription,
      duedate: data.duedate,
      filename: data.filename,
      sdid: parseInt(data.sdid),
    },
  });
  if (!assmnt) throw { status: 500, message: "Failed to add new assessment" };

  return assmnt;
}

async function updateAssmnt({ assid, property, value }) {
  let updatedata;
  switch (property) {
    case "title":
      updatedata = { title: value };
      break;
    case "discription":
      updatedata = { discription: value };
      break;
    case "filename":
      updatedata = { filename: value };
      break;
    case "fileshowname":
      updatedata = { fileshowname: value };
      break;
    case "duedate":
      updatedata = { duedate: value };
      break;
    default:
      break;
  }

  const assmnt = await prisma.assmnt.update({
    where: { id: parseInt(assid) },
    data: updatedata,
  });
  if (!assmnt) throw { status: 500, message: "Failed to update " + property };

  return assmnt;
}

// async function ex(assid, property, value) {
//   // const student = await prisma.studentdetail.findFirst({
//   //   where: {
//   //     id: sdid,
//   //   },
//   // });
//   if (!student) throw { status: 404, message: "No" };

//   return student;
// }

async function getSubmissions(assid) {
  const assmnt = await prisma.assmnt.findFirst({
    where: { id: parseInt(assid) },
  });
  if (!assmnt) throw { status: 500, message: "invalid assesment id" };

  const subs = await prisma.submission.findMany({
    where: { assid: parseInt(assid) },
    select: {
      id: true,
      submitdate: true,
      filename: true,
      user: {
        select: { username: true, studentdetail: { select: { regid: true } } },
      },
    },
  });

  if (!subs) throw { status: 404, message: "No Submissions yet" };
  return { duedate: assmnt.duedate, submissions: subs };
}

async function upsertSubmission({ subid, assid, stuid, filename }) {
  const sub = await prisma.submission.upsert({
    where: {
      id: subid,
    },
    update: {
      filename: filename,
      submitdate: new Date(),
    },
    create: {
      filename: filename,
      assid: assid,
      stuid: stuid,
      submitdate: new Date(),
    },
  });
  if (!sub) throw { status: 500, message: "Something went wrong" };

  return sub;
}

const assmntservice = {
  addAssmnt,
  getAssmntByID,
  getAssmntByIdWithSubmisstion,
  getAssmnts,
  getAssmntTimeline,
  updateAssmnt,
  getSubmissions,
  upsertSubmission,
};

module.exports = assmntservice;
