const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAssmnts(sdid) {
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

const assmntservice = { addAssmnt, getAssmntByID, getAssmnts, updateAssmnt };

module.exports = assmntservice;
