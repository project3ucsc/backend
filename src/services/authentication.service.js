const { PrismaClient, acc_status, user_role } = require("@prisma/client");
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

  if (!user) throw "Username password incorrect";

  const token = jwt.sign({ sub: user.email }, "lakshan", {
    expiresIn: "7d",
  });
  const { id, username, role, school_id } = user;
  return { id, username, email, role, token, school_id };
}

async function register(values) {
  // check whether email is taken
  const userwiththatemail = await prisma.user.findFirst({
    where: {
      email: values.email,
    },
  });
  if (userwiththatemail) throw Error("Email already exists");

  // only student account will actived by defuult
  const status =
    values.usertype === user_role.STUDENT
      ? acc_status.ACTIVE
      : acc_status.INITIAL;

  const hashpass = SHA256(values.password).toString();

  // if pricipal firnst have to add school
  if (values.usertype === user_role.PRINCIPAl) {
    const school = await prisma.school.create({
      data: {
        name: values.schoolname,
        address: values.schooladr,
      },
    });
    const user = await prisma.user.create({
      data: {
        username: values.username,
        email: values.email,
        phone: values.phone,
        gender: values.gender,
        password: hashpass,
        acc_status: status,
        role: values.usertype,
        school_id: school.id,
      },
    });
    return user
      ? { status: "success", acc_status: user.acc_status }
      : { status: "failed" };
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

    return user
      ? { status: "success", acc_status: user.acc_status }
      : { status: "failed" };
  }
}

async function getschools() {
  const schools = await prisma.school.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return schools;
}

const auth = {
  authenticate: authenticate,
  register: register,
  getAllSchools: getschools,
};

module.exports = auth;
