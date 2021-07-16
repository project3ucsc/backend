const { PrismaClient, acc_status, user_role } = require("@prisma/client");
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
    if (!schoolsectiondetail) console.log("err scldetail");
    for (let index = 0; index < count; index++) {
      let i = index + 1;
      const cls = await prisma.classroom.create({
        data: {
          school_id: parseInt(schoolid),
          grade: grade,
          name: i.toString(),
        },
      });
      if (!cls) console.log("err");
    }
  }

  console.log("-------------------");
  return { succes: "sefse" };
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
  if (!schoolsectiondetail) throw "err 404";
  return schoolsectiondetail;
}

async function getdetails(schoolid, grade, name) {
  console.log(schoolid, grade, name);
  try {
    const subjects = await prisma.subject.findMany({
      where: {
        grade: grade,
      },
    });
    console.log(subjects);
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
    console.log(teachers);

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
              },
            },
            teacher: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    return { subjects, teachers, allsubjectdetails };
  } catch (error) {
    console.log(err);
    return error;
  }
}

const classservice = {
  addall,
  getno_of_classes,
  getdetails,
};

module.exports = classservice;
