const express = require("express");
const Router = express.Router();
const releifservice = require("../services/releif.service");

Router.post("/", async (req, res) => {
  try {
    const data = await releifservice.addLeave(req.body);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

Router.post("/addleaveNreleif", async (req, res) => {
  try {
    const data = await releifservice.addleaveNreleif(req.body);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// data for add leave page select component
Router.get("/timeslotsday/:userid/:day", async (req, res) => {
  try {
    const data = await releifservice.getTimeslotsDayForTeacher(
      parseInt(req.params.userid),
      parseInt(req.params.day)
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

Router.get("/:relid", async (req, res) => {
  try {
    const data = await releifservice.getAllReleifbyId(
      parseInt(req.params.relid)
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});
Router.get("/sdid/:relid", async (req, res) => {
  try {
    const data = await releifservice.getRelifSdid(parseInt(req.params.relid));
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

Router.get("/all/:userid", async (req, res) => {
  try {
    const data = await releifservice.getAllReleifs(parseInt(req.params.userid));
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

Router.get("/checkRelifinStudent/:sdid/:tsid", async (req, res) => {
  try {
    const data = await releifservice.checkRelifinStudent(
      parseInt(req.params.tsid),
      parseInt(req.params.sdid)
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

Router.patch("/status", async (req, res) => {
  try {
    const data = await releifservice.setStatus(req.body);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

module.exports = Router;
