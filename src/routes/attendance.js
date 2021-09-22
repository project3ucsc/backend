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

var monthmap = new Map();
monthmap.set(1, "Jan");
monthmap.set(2, "Feb");
monthmap.set(3, "Mar");
monthmap.set(4, "Apr");
monthmap.set(5, "May");
monthmap.set(6, "Jun");
monthmap.set(7, "Jul");
monthmap.set(8, "Aug");
monthmap.set(9, "Sep");
monthmap.set(10, "May");
monthmap.set(11, "May");
monthmap.set(12, "May");

Router.get("/teacheroveroll", async (req, res) => {
  try {
    const groupcount = await prisma.teacherattendance.groupBy({
      by: ["month"],
      _sum: {
        all_c: true,
        done_c: true,
      },
    });
    const data = groupcount.map((g) => (g._sum.done_c / g._sum.all_c) * 100);
    const month = groupcount.map((g) => monthmap.get(g.month));
    console.log(groupcount, data);
    res.json({ data, month });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

Router.get("/leaveteachers/:schid", async (req, res) => {
  try {
    let today = new Date();
    const leaveteac = await prisma.leave.findMany({
      select: {
        from_day: true,
        // to_day: true,
        teacher: { select: { username: true } },
      },
    });

    res.json(leaveteac.filter((l) => l.from_day <= today));
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

Router.get("/setTeacherData/:uid", async (req, res) => {
  try {
    const groupcount = await prisma.teacherattendance.groupBy({
      where: { teacherid: parseInt(req.params.uid) },
      by: ["month"],
      _avg: {
        all_c: true,
        done_c: true,
      },
    });
    // console.log(groupcount);

    // console.log(groupcount, data);
    const leave = await prisma.leave.count({
      where: { teacherid: parseInt(req.params.uid) },
    });
    console.log(groupcount);
    const data = groupcount.map((g) => (g._avg.done_c / g._avg.all_c) * 100);
    const month = groupcount.map((g) => monthmap.get(g.month));
    if (groupcount.length === 0) {
      res.json({
        data,
        month,
        p: "-",
        nop: `- / -`,
        leave,
      });
    } else
      res.json({
        data,
        month,
        p: data[data.length - 1],
        nop: `${groupcount[groupcount.length - 1]._avg.done_c}/${
          groupcount[groupcount.length - 1]._avg.all_c
        }`,
        leave,
      });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

module.exports = Router;
