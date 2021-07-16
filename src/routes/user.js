const express = require("express");
const Router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// return all user documents
Router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ err: error });
  }
});

// return user of given id
Router.get("/:userId", async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(req.params.userId),
      },
    });
    res.json(user);
  } catch (error) {
    res.json({ err: error });
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
  } catch (error) {
    res.json({ err: error });
  }
});

// add new user document
Router.post("/", async (req, res) => {
  // console.log(req.body);
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    age: req.body.age,
  });

  try {
    const saveduser = await user.save();
    res.json(saveduser);
  } catch (error) {
    res.json({ err: error });
  }
});

// delete user of given id
Router.delete("/:userId", async (req, res) => {
  try {
    const deleteduser = await User.remove({ _id: req.params.userId });
    res.json(deleteduser);
  } catch (error) {
    res.json({ err: error });
  }
});

// update user name of given id
Router.patch("/username/:userId", async (req, res) => {
  try {
    const updateduser = await User.updateOne(
      { _id: req.params.userId },
      { $set: { username: req.body.username } }
    );
    res.json(updateduser);
  } catch (error) {
    res.json({ err: error });
  }
});

// update user city of given id
Router.patch("/password/:userId", async (req, res) => {
  try {
    const updateduser = await User.updateOne(
      { _id: req.params.userId },
      { $set: { password: req.body.password } }
    );
    res.json(updateduser);
  } catch (error) {
    res.json({ err: error });
  }
});

// update user age of given id
Router.patch("/email/:userId", async (req, res) => {
  try {
    const updateduser = await User.updateOne(
      { _id: req.params.userId },
      { $set: { email: req.body.email } }
    );
    res.json(updateduser);
  } catch (error) {
    res.json({ err: error });
  }
});

module.exports = Router;
