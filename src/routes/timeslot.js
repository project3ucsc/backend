const express = require("express");
const Router = express.Router();
const timeslotservice = require("../services/timeslot.service");

// return no of classes for each section
Router.get("/:sclid/:grade/:classname", async (req, res) => {
  try {
    const data = await timeslotservice.getTimeSlotsForSclAdmin(
      parseInt(req.params.sclid),
      req.params.grade,
      req.params.classname,
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// add
Router.post("/", async (req, res) => {
  try {
    const data = await timeslotservice.createTimeslot(req.body);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});


module.exports = Router;
