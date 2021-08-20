const express = require("express");
const subjectdetailservice = require("../services/subjectdetail.service");
const Router = express.Router();

// return subject detail al information for teacher
Router.get("/teacher/:sdid/:teacherid", async (req, res) => {
  try {
    const data = await subjectdetailservice.getSubDetailAllData(
      req.params.sdid,
      parseInt(req.params.teacherid)
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// return subject detail al information for teacher
Router.get("/student/:sdid/:stuid", async (req, res) => {
  try {
    const data = await subjectdetailservice.getSubDetailAllDataForStudent(
      req.params.sdid,
      req.params.stuid
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// add resource_section to subject detail
Router.post("/section", async (req, res) => {
  try {
    const data = await subjectdetailservice.addResouceSection(req.body);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});
// delete resource_section to subject detail
Router.delete("/section", async (req, res) => {
  try {
    // const data = await subjectdetailservice.addResouceSection(req.body);
    const data = { m: "bla" };
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// add resource to subject detail
Router.post("/resource", async (req, res) => {
  try {
    const data = await subjectdetailservice.addResouce(req.body);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// update resource name in subject detail
Router.patch("/resource", async (req, res) => {
  try {
    const data = await subjectdetailservice.updateResouceName(req.body);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});
// delete resource to subject detail
Router.delete("/resource/:id", async (req, res) => {
  try {
    const data = await subjectdetailservice.deleteResouce(
      parseInt(req.params.id)
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

module.exports = Router;
