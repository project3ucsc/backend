const express = require("express");
const Router = express.Router();
const timeslotservice = require("../services/timeslot.service");

// return timetable data for scladmin

Router.get("/:sclid/:grade/:classname", async (req, res) => {
  try {
    const data = await timeslotservice.getTimeSlotsForSclAdmin(
      parseInt(req.params.sclid),
      req.params.grade,
      req.params.classname
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});
// return timetable data for student
Router.get("/:sclid/:stuid", async (req, res) => {
  try {
    console.log(parseInt(req.params.sclid), parseInt(req.params.stuid));
    const data = await timeslotservice.getTimeSlotsForStudent(
      parseInt(req.params.sclid),
      parseInt(req.params.stuid)
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// add
Router.post("/:sclid", async (req, res) => {
  try {
    const data = await timeslotservice.createTimeslot(
      req.body,
      parseInt(req.params.sclid)
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});
// update
Router.patch("/:sclid/:tsid", async (req, res) => {
  try {
    const data = await timeslotservice.updateTimeslot(
      req.body,
      parseInt(req.params.sclid),
      parseInt(req.params.tsid)
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// delete
Router.delete("/:tsid", async (req, res) => {
  try {
    const data = await timeslotservice.deleteTimeslot(
      parseInt(req.params.tsid)
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

module.exports = Router;
