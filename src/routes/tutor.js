const express = require("express");
const Router = express.Router();

const enum_tutorschool_req = {
  pending: "a",
  active: "b",
  rejected: "c",
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// templat
Router.get("/hfgh", async (req, res) => {
  try {
    const freeprogs = await prisma.freeprogs.findMany({});

    // if (!bla) throw { status: 500, message: "Procces failed" };
    res.json(freeprogs);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// get class list for  (tutor)
Router.get("/classes/list/:userid", async (req, res) => {
  try {
    const cls = await prisma.pclass.findMany({
      where: { tutorid: parseInt(req.params.userid) },
    });

    if (!cls) throw { status: 500, message: "Procces failed" };

    res.json(cls);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// get class list for (student) card
Router.get("/classes/stu/:sclid", async (req, res) => {
  try {
    const tut = await prisma.tutorschool_req.findMany({
      where: {
        schoolid: parseInt(req.params.sclid),
        status: enum_tutorschool_req.active,
      },
      select: { tutorid: true },
    });
    const aceppetedtutors = tut.map((item) => item.tutorid);
    console.log(aceppetedtutors);

    if (!tut) throw { status: 500, message: "Procces failed" };

    const cls = await prisma.pclass.findMany({
      where: { tutorid: { in: aceppetedtutors } },
      select: {
        day: true,
        fee: true,
        grade: true,
        sttime: true,
        endtime: true,
        subject: true,
        tutor: { select: { username: true } },
      },
    });

    res.json(cls);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// get class by id (student)model
Router.get("/classes/:clsid", async (req, res) => {
  try {
    const cls = await prisma.pclass.findFirst({
      where: { id: parseInt(req.params.clsid) },
      select: {
        discription: true,
        day: true,
        fee: true,
        grade: true,
        sttime: true,
        endtime: true,
        subject: true,
        tutor: { select: { username: true } },
      },
    });
    if (!cls) throw { status: 500, message: "Procces failed" };

    res.json(cls);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// add new class (tutor)
Router.post("/classes", async (req, res) => {
  try {
    const { day, discription, sttime, endtime, fee, grade, subject, tutorid } =
      req.body;
    const cls = await prisma.pclass.create({
      data: {
        day: day,
        discription: discription,
        sttime: sttime,
        endtime: endtime,
        fee: fee,
        grade: grade,
        subject: subject,
        meetingurl: "NA",
        tutorid: tutorid,
      },
    });
    if (!cls) throw { status: 500, message: "Procces failed" };
    res.json(cls);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// update class (tutor)
Router.put("/classes/:clsid", async (req, res) => {
  try {
    const { day, discription, sttime, endtime, fee, grade, subject } = req.body;
    const cls = await prisma.pclass.update({
      where: { id: parseInt(req.params.clsid) },
      data: {
        day: day,
        discription: discription,
        sttime: sttime,
        endtime: endtime,
        fee: fee,
        grade: grade,
        subject: subject,
      },
    });
    if (!cls) throw { status: 500, message: "Procces failed" };
    res.json(cls);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// tutor application form
Router.post("/tutorschoolreq", async (req, res) => {
  try {
    const { tutorid, discription, qualification, schoolid } = req.body;
    const cls = await prisma.tutorschool_req.create({
      data: {
        discription: discription,
        qualification: qualification,
        schoolid: schoolid,
        tutorid: tutorid,
      },
    });
    if (!cls) throw { status: 500, message: "Procces failed" };
    res.json(cls);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// schools for application form (tutor)
Router.get("/school/:tutorid", async (req, res) => {
  try {
    const tut = await prisma.tutorschool_req.findMany({
      where: {
        tutorid: parseInt(req.params.tutorid),
        status: enum_tutorschool_req.active,
      },
      select: { schoolid: true },
    });
    const acceppetedscls = tut.map((item) => item.schoolid);

    const scls = await prisma.school.findMany({
      where: { id: { notIn: acceppetedscls } },
      select: { id: true, name: true },
    });
    res.json(scls);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// get aprove or reject tutor
Router.patch("/tutorschoolreq/status", async (req, res) => {
  try {
    const { status, id } = req.body;
    const cls = await prisma.tutorschool_req.update({
      where: { id: id },
      data: { status: status },
    });
    if (!cls) throw { status: 500, message: "Procces failed" };
    res.json(cls);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

module.exports = Router;
