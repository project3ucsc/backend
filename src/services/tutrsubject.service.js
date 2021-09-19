const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const enum_studenttution = {
  pending: "a",
  active: "b",
  rejected: "c",
  suspended: "d",
};

async function getSubDetailAllData(sdid, userid) {
  const subject_detail = await prisma.pclass.findFirst({
    where: {
      id: parseInt(sdid),
    },
    select: {
      id: true,
      meetingurl: true,
      sttime: true,
      endtime: true,
      tutorid: true,
      subject: true,
      grade: true,
      day: true,

      presource_section: {
        select: {
          id: true,
          name: true,
          presource_details: {
            select: {
              id: true,
              filename: true,
              name: true,
              type: true,
            },
          },
        },
      },
    },
  });

  if (!subject_detail) throw { status: 404, message: "no data" };

  if (userid !== subject_detail.tutorid)
    throw { status: 403, message: "Unauthorized to view this" };

  return subject_detail;
}

async function getSubDetailAllDataForStudent(sdid, userid) {
  const subject_detail = await prisma.pclass.findFirst({
    where: {
      id: parseInt(sdid),
    },
    select: {
      id: true,
      meetingurl: true,
      sttime: true,
      endtime: true,
      subject: true,
      day: true,
      presource_section: {
        select: {
          id: true,
          name: true,
          presource_details: {
            select: {
              id: true,
              filename: true,
              name: true,
              type: true,
            },
          },
        },
      },
    },
  });

  if (!subject_detail) throw { status: 404, message: "no data" };

  const studetail = await prisma.studenttution.findFirst({
    where: {
      studentid: parseInt(userid),
      status: enum_studenttution.active,
    },
  });

  if (!studetail)
    throw { status: 404, message: "You have not enrolled to a tution class" };

  if (studetail.pclassid !== subject_detail.id)
    throw { status: 403, message: "Unauthorized to view this" };

  return subject_detail;
}

async function addResouceSection({ sdid, title }) {
  const new_resource_section = await prisma.presource_section.create({
    data: {
      sdid: parseInt(sdid),
      name: title,
    },
  });

  if (!new_resource_section)
    throw { status: 500, message: "Failed to create new section" };

  return new_resource_section;
}

async function deleteResouceSection(secid) {
  const deletedsec = await prisma.presource_section.delete({
    where: {
      id: secid,
    },
  });

  if (!deletedsec) throw { status: 500, message: "Failed to delete section" };

  return deletedsec;
}

async function addResouce({ filename, link, secid, type, name }) {
  let fname = type === "link" ? link : filename;
  const new_resource = await prisma.presource_detail.create({
    data: {
      section_id: secid,
      name: name,
      type: type,
      filename: fname,
    },
  });
  if (!new_resource)
    throw { status: 500, message: "Failed to create new resource" };
  return new_resource;
}

async function deleteResouce(resid) {
  const del = await prisma.presource_detail.delete({
    where: {
      id: resid,
    },
  });
  if (!del) throw { status: 500, message: "Failed to delete resource" };
  return del;
}

async function updateResouceName({ id, name }) {
  const up = await prisma.presource_detail.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
  if (!up) throw { status: 500, message: "Failed to update name of resource" };
  return up;
}

async function editMeetingUrl({ tsid, url }) {
  const today = new Date();

  const up = await prisma.time_slot.update({
    where: {
      id: tsid,
    },
    data: {
      meetingurl: url,
      lastupdated: today,
    },
  });
  if (!up) throw { status: 500, message: "Failed to update url" };
  return up;
}

const subjectdetailservice = {
  getSubDetailAllData,
  getSubDetailAllDataForStudent,
  addResouceSection,
  deleteResouceSection,
  addResouce,
  deleteResouce,
  updateResouceName,
  editMeetingUrl,
};

module.exports = subjectdetailservice;
