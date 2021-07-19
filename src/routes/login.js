const { Router } = require("express");
const authservice = require("../services/authentication.service");
// const User = require('../models/User')

const Route = Router();

Route.post("/", async (req, res) => {
  try {
    const user = await authservice.authenticate(req.body);
    res.json(user);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

Route.post("/register", async (req, res) => {
  try {
    const user = await authservice.register(req.body);
    res.json(user);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

Route.get("/register/school", async (req, res) => {
  try {
    const schools = await authservice.getAllSchools();
    res.json(schools);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

module.exports = Route;
