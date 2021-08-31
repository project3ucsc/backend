const {
  PrismaClient,
  student_datail_status,
  subjectgroup,
} = require("@prisma/client");
const prisma = new PrismaClient();
// names = ['A','B','C','D','E','F','F','H','I',   ]

async function getsStudentEnrollStatus(userid) {
  const st = await prisma.studentdetail.findFirst({
    where: {
      user_id: parseInt(userid),
    },
    select: {
      status: true,
      classid: true,
    },
  });

  if (!st) return { status: student_datail_status.NO_ENROll };
  return st;
}

// for teacher
async function getPendingEnrollRequests(teacherid, schoolid) {
  const classroom = await prisma.classroom.findFirst({
    where: {
      classteacher_id: teacherid,
      school_id: schoolid,
    },
  });
  if (!classroom) throw { status: 404, message: "Teacher has no classroom" };

  const students = await prisma.studentdetail.findMany({
    where: {
      classid: classroom.id,
    },
    select: {
      regid: true,
      status: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  if (!students) throw { status: 404, message: "Teacher has no classroom" };

  return { classroom, students };
}

async function unenrollStudent(classid, userid) {
  const std = await prisma.studentdetail.findFirst({
    where: {
      classid: classid,
      user_id: userid,
      status: student_datail_status.PENDING,
    },
  });
  if (!std) throw { status: 404, message: "Failed to unenroll" };

  const ops = await prisma.optionalsubs.deleteMany({
    where: {
      studentdetail_id: std.id,
    },
  });
  console.log(ops);
  const deletedstd = await prisma.studentdetail.delete({
    where: {
      id: std.id,
    },
  });
  return deletedstd;
}

async function enrollStudent(userid, data) {
  const std = await prisma.studentdetail.create({
    data: {
      user_id: userid,
      classid: data.classid,
      regid: data.regid,
      status: student_datail_status.PENDING,
    },
  });

  if (data.section === "69") {
    const ops = await prisma.optionalsubs.create({
      data: {
        sd_id: data.OPTIONAL_69,
        studentdetail_id: std.id,
        subjectgroup: subjectgroup.OPTIONAL_69,
      },
    });
  } else if (data.section === "OL") {
    const ops = await prisma.optionalsubs.createMany({
      data: [
        {
          sd_id: data.OL_BUCKET_1,
          studentdetail_id: std.id,
          subjectgroup: subjectgroup.OL_BUCKET_1,
        },
        {
          sd_id: data.OL_BUCKET_2,
          studentdetail_id: std.id,
          subjectgroup: subjectgroup.OL_BUCKET_2,
        },
        {
          sd_id: data.OL_BUCKET_3,
          studentdetail_id: std.id,
          subjectgroup: subjectgroup.OL_BUCKET_3,
        },
      ],
    });
  } else if (data.section === "AL") {
    if (data.OPTIONAL_AL) {
      const [sdid, subgroup] = data.OPTIONAL_AL.split(".");
      const ops = await prisma.optionalsubs.create({
        data: {
          sd_id: parseInt(sdid),
          studentdetail_id: std.id,
          subjectgroup: subgroup,
        },
      });
    }
  }

  // if (!st) return { status: student_datail_status.NO_ENROll };
  return std;
}

const enrollservice = {
  getsStudentEnrollStatus,
  getPendingEnrollRequests,
  enrollStudent,
  unenrollStudent,
};

module.exports = enrollservice;
