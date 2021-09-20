const express = require("express");
const Router = express.Router();

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

// for teacher
Router.get("/isAtttakenToday/:tsid", async (req, res) => {
  try {
    const today = new Date();

    const tsAtt = await prisma.timeslotattendance.findFirst({
      where: {
        tsid: parseInt(req.params.tsid),
        date: today.toLocaleDateString(),
      },
    });

    if (!tsAtt) res.json({ status: "a", randomnum: 0, id: 0 });
    else res.json(tsAtt);
    // res.json({ status: "b", randomnum: 5420 });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// teacher att
Router.post("/startAttsession", async (req, res) => {
  try {
    // const { teacherid, month, all_c, done_c, leave_c, relreq_c, reldone_c } =
    const { teacherid, tsid, sdid, code } = req.body;
    console.log(req.body);
    const cls = await prisma.timeslotattendance.create({
      data: {
        tsid: tsid,
        teacherid: teacherid,
        sdid: sdid,
        randomnum: code,
        date: new Date().toLocaleDateString(),
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

// teacher att
Router.patch("/stopAttSession", async (req, res) => {
  try {
    const today = new Date();

    const { sdid, id, teacherid } = req.body;
    const tsu = await prisma.timeslotattendance.update({
      where: { id: id },
      data: { status: "c" },
    });

    if (!tsu) throw { status: 500, message: "Procces failed" };

    // get class id
    const sd = await prisma.subject_detail.findFirst({
      where: { id: sdid },
    });

    let totalStudentsinclass = await prisma.studentdetail.count({
      where: { classid: sd.classid, status: "ACTIVE" },
    });
    console.log("clscount", totalStudentsinclass);
    console.log("stucount", tsu.stucount);
    const getAtt = tsu.stucount >= totalStudentsinclass / 4 ? true : false;
    const teacherattendance = await prisma.teacherattendance.findFirst({
      where: { teacherid: teacherid, month: today.getMonth() },
    });
    console.log(req.body);
    if (!teacherattendance) {
      // calculate total working timslot for the teacher ---------------
      // const tscount = await prisma.time_slot.groupBy({
      //   by: ["weekday"],
      //   _count: {
      //     weekday: true,
      //   },
      //   where: { teacher_id: teacherid },
      // });
      // console.log(tscount);
      let weeksum = await prisma.time_slot.count({
        where: { teacher_id: teacherid },
      });
      // ------------------------------------------------------------------
      // console.log(sum);
      await prisma.teacherattendance.create({
        data: {
          teacherid: teacherid,
          month: today.getMonth(),
          all_c: weeksum * 4,
          done_c: getAtt ? 1 : 0,
        },
      });
    } else {
      if (getAtt) {
        await prisma.teacherattendance.update({
          where: { id: teacherattendance.id },
          data: { done_c: { increment: 1 } },
        });
      }
    }
    // res.json(tsa);
  } catch (err) {
    console.log(err.message);
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

Router.patch("/stuclick", async (req, res) => {
  try {
    const { id } = req.body;

    const tsa = await prisma.timeslotattendance.findFirst({
      where: { id: id },
    });
    if (tsa.status === "c")
      throw { status: 500, message: "Taking attendance has sttopped now" };

    const tsu = await prisma.timeslotattendance.update({
      where: { id: id },
      data: { stucount: { increment: 1 } },
    });
    res.json(tsu);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

module.exports = Router;
