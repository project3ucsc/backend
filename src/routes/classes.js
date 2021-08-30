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

// return class for id
Router.get("/:classid", async (req, res) => {
  try {
    const data = await classservice.getClass(parseInt(req.params.classid));
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

// return subject details for teacherRouter
Router.get("/getSubDetailsforTeacher/:userid", async (req, res) => {
  try {
    const data = await classservice.getSubDetailsForteacherRouter(
      req.params.userid
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// return enroal status of a student
Router.get("/enrollStatus/:userid", async (req, res) => {
  try {
    const data = await classservice.getsStudentEnrollStatus(req.params.userid);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// return enroal status of a student
Router.post("/enroll/:userid", async (req, res) => {
  try {
    const data = await classservice.enrollStudent(
      parseInt(req.params.userid),
      req.body
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

Router.delete("/unenroll/:classid/:userid", async (req, res) => {
  try {
    const data = await classservice.unenrollStudent(
      parseInt(req.params.classid),
      parseInt(req.params.userid)
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// return subject details for teacherRouter
Router.get("/getSubDetailsforStudent/:userid", async (req, res) => {
  try {
    const data = await classservice.getSubDetailsForStudentRouter(
      req.params.userid
    );
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

Router.get("/getSDsinClass/:school/:grade/:classno", async (req, res) => {
  try {
    const data = await classservice.getSDsinClass(
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
// subjectdetail add
Router.post("/subjectdetail", async (req, res) => {
  try {
    const data = await classservice.addSubjectDetail(req.body);
    console.log(data);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});
// subjectdetail delete
Router.delete("/subjectdetail/:sdid", async (req, res) => {
  try {
    const data = await classservice.deleteSubjectDetail(
      parseInt(req.params.sdid)
    );
    console.log(data);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});
// subjectdetail update
Router.patch("/subjectdetail/:sdid", async (req, res) => {
  try {
    const data = await classservice.patchSubjectDetail(
      parseInt(req.params.sdid),
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
