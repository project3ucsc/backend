const express = require("express");
const assmntservice = require("../services/assmnt.service");
const Router = express.Router();

Router.get("/all/:sdid", async (req, res) => {
  try {
    const data = await assmntservice.getAssmnts(req.params.sdid);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

Router.get("/:assid", async (req, res) => {
  try {
    const data = await assmntservice.getAssmntByID(req.params.assid);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

Router.get("/attach/:assid/:stuid", async (req, res) => {
  try {
    const data = await assmntservice.getAssmntByIdWithSubmisstion(
      req.params.assid,
      req.params.stuid
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
    const data = await assmntservice.addAssmnt(req.body);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

//  update
Router.patch("/", async (req, res) => {
  try {
    const data = await assmntservice.updateAssmnt(req.body);
    console.log(data);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

Router.get("/submission/all/:assid", async (req, res) => {
  try {
    const data = await assmntservice.getSubmissions(req.params.assid);
    console.log(data);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

Router.put("/submission", async (req, res) => {
  try {
    const data = await assmntservice.upsertSubmission(req.body);
    console.log(data);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

//  delete
// Router.delete("/", async (req, res) => {
//   try {
//     const data = await assmntservice;
//     console.log(data);
//     res.json(data);
//   } catch (err) {
//     res
//       .status(err.status || 500)
//       .json({ status: err.status, message: err.message });
//   }
// });

module.exports = Router;
