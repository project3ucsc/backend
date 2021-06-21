const { Router } = require("express");
const { secret } = require("../helpers/config");
// const User = require('../models/User')
const jwt = require("jsonwebtoken");

const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

const Route = Router();

Route.post("/", (req, res, next) => {
  authenticate(req.body)
    .then((user) => res.json(user))
    .catch(next);
});

async function authenticate({ username, password }) {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
      password: password,
    },
  });

  if (!user) throw "Username password incorrect";

  const token = jwt.sign({ sub: user.username }, "lakshan", {
    expiresIn: "7d",
  });
  const { id, role } = user;
  return { id, username, role, token };
}

module.exports = Route;
