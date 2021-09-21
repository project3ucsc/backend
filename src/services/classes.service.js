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
  const upschool = await prisma.school.update({
    where: { id: parseInt(schoolid) },
    data: { isconfig: true },
  });

  console.log("-------------------");
  return upschool;
}
async function addClass({ grade, count }, schoolid) {
  console.log(schoolid);

  console.log(grade, count);

  const schoolsectiondetail = await prisma.schoolsectiondetail.findFirst({
    where: { school_id: parseInt(schoolid), grade: grade },
  });
  if (!schoolsectiondetail) throw { status: 500, message: "Proccess failed" };

  const schoolsectiondetailup = await prisma.schoolsectiondetail.update({
    where: { id: schoolsectiondetail.id },
    data: {
      classcount: { increment: count },
    },
  });

  if (!schoolsectiondetailup) throw { status: 500, message: "Proccess failed" };

  console.log(schoolsectiondetail);

  if (!schoolsectiondetail) throw { status: 500, message: "Proccess failed" };
  for (
    let index = schoolsectiondetail.classcount;
    index < schoolsectiondetail.classcount + count;
    index++
  ) {
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

  return "done";
}

async function setClassteacher({ classid, teacherid }) {
  const ct = await prisma.classroom.update({
    where: {
      id: classid,
    },
    data: {
      classteacher_id: teacherid,
    },
  });

  if (!ct) throw { status: 500, message: "Failed to set class teacher" };
  return ct;
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
    select: {
      classid: true,
      optionalsubs: true,
      classroom: {
        select: {
          grade: true,
          name: true,
        },
      },
    },
  });
  // console.log(studetail);
  if (!studetail) throw { status: 404, message: "notenrolled" };

  const subs = await prisma.subject_detail.findMany({
    where: {
      classid: studetail.classid,
    },
    select: {
      id: true,
      subject: {
        select: {
          subjectgroup: true,
          name: true,
        },
      },
    },
  });
  // console.log(subs);
  if (!subs) throw { status: 404, message: "no data" };

  let filteredsubs = subs.filter((sub) => sub.subject.subjectgroup === "COMP");
  let optsubs = subs.filter((sub) => sub.subject.subjectgroup !== "COMP");
  studetail.optionalsubs.forEach((optionalsub) => {
    filteredsubs.push(optsubs.find((sub) => sub.id === optionalsub.sd_id));
  });

  return { subs: filteredsubs, classroom: studetail.classroom };
}

async function getSubDetailsForStudentDash(userid) {
  const studetail = await prisma.studentdetail.findFirst({
    where: {
      user_id: parseInt(userid),
      status: student_datail_status.ACTIVE,
    },
    select: {
      classid: true,
      optionalsubs: true,
      classroom: { select: { grade: true, name: true } },
    },
  });
  // console.log(studetail);
  if (!studetail) throw { status: 404, message: "notenrolled" };

  const subs = await prisma.subject_detail.findMany({
    where: {
      classid: studetail.classid,
    },
    select: {
      id: true,
      teacher: { select: { username: true } },
      subject: {
        select: {
          subjectgroup: true,
          name: true,
        },
      },
    },
  });
  // console.log(subs);
  if (!subs) throw { status: 404, message: "no data" };

  let filteredsubs = subs.filter((sub) => sub.subject.subjectgroup === "COMP");
  let optsubs = subs.filter((sub) => sub.subject.subjectgroup !== "COMP");
  studetail.optionalsubs.forEach((optionalsub) => {
    filteredsubs.push(optsubs.find((sub) => sub.id === optionalsub.sd_id));
  });

  return { subs: filteredsubs, classroom: studetail.classroom };
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

async function isConfig(schoolid) {
  const school = await prisma.school.findFirst({
    where: {
      id: parseInt(schoolid),
    },
    select: { isconfig: true },
  });
  if (!school) throw { status: 404, message: "Details Not Found" };
  return school;
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
        classteacher_id: true,

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
  addClass,
  setClassteacher,
  getno_of_classes,
  isConfig,
  getSubDetailsForteacherRouter,
  getSubDetailsForStudentRouter,
  getSDsinClass,
  getdetails,
  addSubjectDetail,
  deleteSubjectDetail,
  patchSubjectDetail,
  getSubDetailsForStudentDash,
};

module.exports = classservice;
