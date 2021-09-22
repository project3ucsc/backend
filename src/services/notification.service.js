const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getNotifications(id) {
  const notis = await prisma.notification.findMany({ where: { to: id } });
  // if (!del) throw { status: 404, message: "Process failed" };
  return notis;
}

async function addNotification({ title, discription, to, onClickTo, type }) {
  const newnoti = await prisma.notification.create({
    data: {
      title: title,
      discription: discription,
      to: to,
      onClickTo: onClickTo,
      type: type,
    },
  });
  if (!newnoti) throw { status: 404, message: "Process failed" };
  return newnoti;
}
async function deleteNotification(id) {
  const del = await prisma.notification.delete({ where: { id: id } });
  if (!del) throw { status: 404, message: "Process failed" };
  return del;
}

const notificationservice = {
  getNotifications,
  addNotification,
  deleteNotification,
};

module.exports = notificationservice;
