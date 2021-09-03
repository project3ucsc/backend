const express = require("express");
const Router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// return all user documents
Router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// return user of given id
Router.get("/:userId", async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(req.params.userId),
      },
      select: {
        email: true,
        gender: true,
        id: true,
        phone: true,
        role: true,
        school: true,
        username: true,
      },
    });
    res.json(user);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});
// return user of given id
Router.put("/:userId", async (req, res) => {
  try {
    const updateUser = await prisma.user.update({
      where: {
        id: parseInt(req.params.userId),
      },
      data: {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
      },
    });
    res.json(updateUser);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

module.exports = Router;
