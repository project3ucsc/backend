const express = require("express");
const Router = express.Router();
const classservice = require("../services/classes.service");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

Router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ err: error });
  }
});

Router.post("/addall/:sclid", async (req, res) => {
  try {
    const data = await classservice.addall(req.body, req.params.sclid);
    res.json(data);
  } catch (error) {
    res.json({ err: error });
  }
});

// return no of classes for each section
Router.get("/num/:sclid", async (req, res) => {
  try {
    const data = await classservice.getno_of_classes(req.params.sclid);
    res.json(data);
  } catch (error) {
    res.json({ err: error });
  }
});

Router.get("/getdetails/:school/:grade/:classno", async (req, res) => {
  try {
    const data = await classservice.getdetails(
      parseInt(req.params.school),
      req.params.grade,
      req.params.classno
    );
    res.json(data);
  } catch (error) {
    res.json({ err: error });
  }
});

module.exports = Router;
