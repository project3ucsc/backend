const { PrismaClient, user_role, acc_status } = require("@prisma/client");

const prisma = new PrismaClient();
// "nodemon": "^2.0.7"
async function main() {
  // const scl = await prisma.school.create({
  //   data: {
  //     name: "Bandaragama Central College",
  //     address: "Bandaragama",
  //   },
  // });
  // console.log(scl);

  // const u = await prisma.user.create({
  //   data: {
  //     username: "lakshan",
  //     email: "lakshansandaruwan1998@gmail.com",
  //     password: "1234",
  //     acc_status: acc_status.ACTIVE,
  //     role: user_role.STUDENT,
  //     school_id: 1,
  //   },
  // });

  const user = await prisma.user.findMany({
    // include: {
    //   school: true,
    // },
  });
  console.log(user);
}
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
