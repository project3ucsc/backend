const express = require("express");
const Router = express.Router();
const periodservice = require("../services/period.service");

// return no of classes for each section
Router.get("/:sclid/:level", async (req, res) => {
  try {
    const data = await periodservice.getPeriodSlots(
      parseInt(req.params.sclid),
      req.params.level
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
    const data = await periodservice.addPeriod(req.body);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});
//  delete
Router.delete("/:psid", async (req, res) => {
  try {
    const data = await periodservice.deletePeriod(parseInt(req.params.psid));
    console.log(data);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});
//  update
Router.patch("/:psid", async (req, res) => {
  try {
    const data = await periodservice.patchPeriod(
      parseInt(req.params.psid),
      req.body
    );
    console.log(data);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

module.exports = Router;
