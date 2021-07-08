const { PrismaClient, Role } = require("@prisma/client");

const prisma = new PrismaClient();
// "nodemon": "^2.0.7"
async function main() {
  // const users = await prisma.user.findFirst({
  //   include:{
  //     school:true
  //   }
  // });
  const users = await prisma.school.findFirst();
  console.log(users);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
