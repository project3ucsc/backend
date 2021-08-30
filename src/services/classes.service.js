const {
  PrismaClient,
  acc_status,
  user_role,
  student_datail_status,
  subjectgroup,
} = require("@prisma/client");
const prisma = new PrismaClient();
// names = ['A','B','C','D','E','F','F','H','I',   ]
async function addall(values, schoolid) {
  console.log(schoolid);

  for (const [grade, count] of Object.entries(values)) {
    console.log(grade, count);
    const schoolsectiondetail = await prisma.schoolsectiondetail.create({
      data: {
        school_id: parseInt(schoolid),
        grade: grade,
        classcount: parseInt(count),
      },
    });
    console.log(schoolsectiondetail);

    if (!schoolsectiondetail) throw { status: 500, message: "Proccess failed" };
    for (let index = 0; index < count; index++) {
      let i = index + 1;
      const cls = await prisma.classroom.create({
        data: {
          school_id: parseInt(schoolid),
          grade: grade,
          name: i.toString(),
        },
      });
      if (!cls)
        throw { status: 500, message: "Proccess failed when creating classes" };
    }
  }

  console.log("-------------------");
  return { succes: "200" };
}

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
      // regid:data.regid,
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
async function getSubDetailsForteacherRouter(userid) {
  const subs = await prisma.subject_detail.findMany({
    where: {
      teacher_id: parseInt(userid),
    },
    select: {
      id: true,
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
    },
  });

  if (!subs) throw { status: 404, message: "no data" };

  return subs;
}

async function getSubDetailsForStudentRouter(userid) {
  const studetail = await prisma.studentdetail.findFirst({
    where: {
      user_id: parseInt(userid),
      status: student_datail_status.ACTIVE,
    },
  });

  if (!studetail) throw { status: 404, message: "notenrolled" };

  const subs = await prisma.subject_detail.findMany({
    where: {
      classid: studetail.classid,
    },
    select: {
      id: true,
      subject: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!subs) throw { status: 404, message: "no data" };

  return subs;
}

async function getClass(classid) {
  const classroom = await prisma.classroom.findFirst({
    where: {
      id: parseInt(classid),
    },
  });
  if (!classroom) throw { status: 404, message: "Class Not Found" };
  return classroom;
}

async function getno_of_classes(schoolid) {
  const schoolsectiondetail = await prisma.school.findFirst({
    where: {
      id: parseInt(schoolid),
    },
    select: {
      schoolsectiondetail: {
        orderBy: {
          grade: "asc",
        },
        select: {
          grade: true,
          classcount: true,
        },
      },
    },
  });
  if (!schoolsectiondetail) throw { status: 404, message: "Details Not Found" };
  return schoolsectiondetail;
}

async function getSDsinClass(schoolid, grade, name) {
  const allsubjectdetails = await prisma.classroom.findFirst({
    where: {
      AND: {
        school_id: schoolid,
        grade: grade,
        name: name,
      },
    },
    select: {
      id: true,

      subject_detail: {
        select: {
          id: true,
          subject: {
            select: {
              id: true,
              name: true,
              subjectgroup: true,
            },
          },
        },
      },
    },
  });

  if (!allsubjectdetails) throw { status: 404, message: "Class not found" };

  return allsubjectdetails;
}

async function getdetails(schoolid, grade, name) {
  console.log(schoolid, grade, name);
  try {
    const subjects = await prisma.subject.findMany({
      where: {
        grade: grade,
      },
    });

    if (!subjects) throw { status: 500, message: "Proccess failed" };

    const teachers = await prisma.user.findMany({
      where: {
        AND: {
          school_id: schoolid,
          acc_status: acc_status.ACTIVE,
          role: user_role.TEACHER,
        },
      },
      select: {
        id: true,
        username: true,
      },
    });

    if (!teachers) throw { status: 500, message: "Proccess failed" };

    const allsubjectdetails = await prisma.classroom.findFirst({
      where: {
        AND: {
          school_id: schoolid,
          grade: grade,
          name: name,
        },
      },
      select: {
        id: true,

        subject_detail: {
          select: {
            id: true,
            subjectid: true,
            teacher_id: true,
          },
        },
      },
    });

    return { subjects, teachers, allsubjectdetails };
  } catch (error) {
    throw error;
  }
}

async function addSubjectDetail({ classroomid, subject, teacher }) {
  const subjectdetail = await prisma.subject_detail.create({
    data: {
      classid: classroomid,
      subjectid: subject,
      teacher_id: teacher,
      tsid: 3,
    },
  });
  if (!subjectdetail) throw { status: 500, message: "Process Failed" };
  return subjectdetail;
}

async function deleteSubjectDetail(sdid) {
  const deletedsubjectdetail = await prisma.subject_detail.delete({
    where: {
      id: sdid,
    },
  });
  if (!deletedsubjectdetail) throw { status: 500, message: "Process Failed" };
  return deletedsubjectdetail;
}

async function patchSubjectDetail(sdid, data) {
  const patchedsubjectdetail = await prisma.subject_detail.update({
    where: {
      id: sdid,
    },
    data: {
      subjectid: data.subject,
      teacher_id: data.teacher,
    },
  });
  if (!patchedsubjectdetail) throw { status: 500, message: "Process Failed" };
  return patchedsubjectdetail;
}

const classservice = {
  getClass,
  addall,
  getno_of_classes,
  getsStudentEnrollStatus,
  enrollStudent,
  unenrollStudent,
  getSubDetailsForteacherRouter,
  getSubDetailsForStudentRouter,
  getSDsinClass,
  getdetails,
  addSubjectDetail,
  deleteSubjectDetail,
  patchSubjectDetail,
};

module.exports = classservice;
