const { PrismaClient, acc_status, user_role } = require("@prisma/client");
const prisma = new PrismaClient();

async function getSubDetailAllData(sdid, userid) {
  const subject_detail = await prisma.subject_detail.findFirst({
    where: {
      id: parseInt(sdid),
    },
    select: {
      id: true,
      teacher_id: true,
      subject: {
        select: {
          name: true,
        },
      },
      classroom: {
        select: {
          grade: true,
          name: true,
          classteacher_id: true,
        },
      },
      resource_section: {
        select: {
          id: true,
          name: true,
          resource_details: {
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

  if (userid !== subject_detail.teacher_id)
    throw { status: 403, message: "Unauthorized to view this" };

  return subject_detail;
}

async function addResouceSection({ sdid, title }) {
  const new_resource_section = await prisma.resource_section.create({
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
  const deletedsec = await prisma.resource_section.delete({
    where: {
      id: secid,
    },
  });

  if (!deletedsec) throw { status: 500, message: "Failed to delete section" };

  return deletedsec;
}

async function addResouce({ filename, link, secid, type, name }) {
  let fname = type === "link" ? link : filename;
  const new_resource = await prisma.resource_detail.create({
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
  const del = await prisma.resource_detail.delete({
    where: {
      id: resid,
    },
  });
  if (!del) throw { status: 500, message: "Failed to delete resource" };
  return del;
}

async function updateResouceName({ id, name }) {
  const up = await prisma.resource_detail.update({
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

const subjectdetailservice = {
  getSubDetailAllData,
  addResouceSection,
  deleteResouceSection,
  addResouce,
  deleteResouce,
  updateResouceName,
};

module.exports = subjectdetailservice;
