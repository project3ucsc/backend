const { PrismaClient, acc_status, user_role } = require("@prisma/client");
const notificationservice = require("./notification.service");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { SHA256 } = require("crypto-js");
const { secret } = require("../helpers/config");

async function authenticate({ email, password }) {
  const hashpass = SHA256(password).toString();
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      password: hashpass,
    },
  });

  if (!user) throw { status: 500, message: "Username password incorrect" };
  if (user.acc_status !== "ACTIVE")
    throw { status: 500, message: "Your account is not activated yet" };

  const token = jwt.sign({ sub: user.email }, "lakshan", {
    expiresIn: "7d",
  });
  const { id, username, role, school_id } = user;
  return { id, username, email, role, token, school_id };
}

async function register(values) {
  // check whether email is taken
  const userwiththatemail = await prisma.user.findFirst({
    where: { email: values.email },
  });
  if (userwiththatemail) throw { status: 500, message: "Email already exists" };

  // only student account will actived by defuult
  const status =
    values.usertype === user_role.STUDENT || values.usertype === user_role.TUTOR
      ? acc_status.ACTIVE
      : acc_status.INITIAL;

  const hashpass = SHA256(values.password).toString();

  // if pricipal firnst have to add school
  if (values.usertype === user_role.PRINCIPAl) {
    const school = await prisma.school.create({
      data: {
        name: values.schoolname,
        address: values.schooladr,
        filename: values.filename,
      },
    });
    const user = await prisma.user.create({
      data: {
        username: values.username,
        email: values.email,
        phone: values.phone,
        gender: values.gender,
        adr: values.address,
        password: hashpass,
        acc_status: status,
        role: values.usertype,
        school_id: school.id,
      },
    });
    const title = "New Principal request.";
    const discription =
      "You have receieved a pricipal request from " +
      values.username;

    await notificationservice.addNotification({
      title,
      discription,
      to: "2",
      onClickTo: "/PrincipalManagement",
      type: "a",
    });

    if (!user) throw { status: 500, message: "Registration Falied" };
    return { status: "success", acc_status: user.acc_status };
  } else {
    const user = await prisma.user.create({
      data: {
        username: values.username,
        email: values.email,
        phone: values.phone,
        gender: values.gender,
        password: hashpass,
        acc_status: status,
        role: values.usertype,
        school_id: values.school,
      },
    });

    if (!user) throw { status: 500, message: "Registration Falied" };
    return { status: "success", acc_status: user.acc_status };
  }
}

async function getAllSchools() {
  const schools = await prisma.school.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  if (!schools) throw { status: 500, message: "Something went wrong" };

  return schools;
}

async function setAccountStatus({ userid, status }) {
  const st = await prisma.user.update({
    where: { id: userid },
    data: { acc_status: status },
  });
  if (!st) throw { status: 500, message: "Something went wrong" };

  return st;
}
async function getPendingNAciveAccounts(role, school_id) {
  if (role === user_role.PRINCIPAl) {
    const pending = await prisma.user.findMany({
      where: {
        role: role,
        acc_status: acc_status.INITIAL,
      },
      select: {
        id: true,
        username: true,
        email: true,
        school: { select: { name: true } },
      },
    });
    const active = await prisma.user.findMany({
      where: {
        role: role,
        acc_status: acc_status.ACTIVE,
      },
      select: {
        id: true,
        username: true,
        email: true,
        school: { select: { name: true } },
      },
    });
    // if (!teachers) throw { status: 404, message: "" };

    return { pending, active };
  }
  const pending = await prisma.user.findMany({
    where: { school_id: school_id, role: role, acc_status: acc_status.INITIAL },
    select: { id: true, username: true, email: true },
  });
  const active = await prisma.user.findMany({
    where: { school_id: school_id, role: role, acc_status: acc_status.ACTIVE },
    select: { id: true, username: true, email: true },
  });
  // if (!teachers) throw { status: 404, message: "" };

  return { pending, active };
}

const auth = {
  authenticate,
  register,
  getAllSchools,
  setAccountStatus,
  getPendingNAciveAccounts,
};

module.exports = auth;
