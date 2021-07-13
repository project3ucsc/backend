const { PrismaClient, user_role, acc_status } = require("@prisma/client");

const prisma = new PrismaClient();
// "nodemon": "^2.0.7"
async function main() {
  // const scl = await prisma.school.create({
  //   data: {
  //     name: "Ananda College",
  //     address: "Colomobo 10",
  //   },
  // });
  // console.log(scl);

  // const u = await prisma.user.create({
  //   data: {
  //     username: "teacher",
  //     email: "klkjkjh@gmail.com",
  //     password:
  //       "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
  //     acc_status: acc_status.ACTIVE,
  //     role: user_role.TEACHER,
  //     school_id: 2,
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
