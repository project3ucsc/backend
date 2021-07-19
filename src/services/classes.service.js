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
    throw error;
  }
}

const classservice = {
  addall,
  getno_of_classes,
  getdetails,
};

module.exports = classservice;
