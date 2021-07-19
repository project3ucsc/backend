const express = require("express");
const Router = express.Router();
const classservice = require("../services/classes.service");

Router.post("/addall/:sclid", async (req, res) => {
  try {
    const data = await classservice.addall(req.body, req.params.sclid);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// return no of classes for each section
Router.get("/num/:sclid", async (req, res) => {
  try {
    const data = await classservice.getno_of_classes(req.params.sclid);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
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
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

module.exports = Router;
