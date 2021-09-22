const express = require("express");
const Router = express.Router();

const enum_tutorschool_req = {
  pending: "a",
  active: "b",
  rejected: "c",
};

const enum_studenttution = {
  pending: "a",
  active: "b",
  rejected: "c",
  suspended: "d",
};
const enum_payment = {
  notpaid: "a",
  paid: "b",
  accceted: "c",
  rejected: "d",
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

// get class list for  (tutor) 🚗
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

// get class list for (student) card 🚗
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
        id: true,
        day: true,
        fee: true,
        grade: true,
        sttime: true,
        endtime: true,
        subject: true,
        discription: true,
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

// add new class (tutor) 🚗
Router.post("/classes", async (req, res) => {
  try {
    const { day, discription, timerange, fee, grade, subject, tutorid } =
      req.body;
    const cls = await prisma.pclass.create({
      data: {
        day: day,
        discription: discription,
        sttime: timerange[0],
        endtime: timerange[1],
        fee: fee.toString(),
        grade: grade.toString(),
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

// update class (tutor) 🚗
Router.put("/classes/:clsid", async (req, res) => {
  try {
    const { day, discription, timerange, fee, grade, subject } = req.body;
    const cls = await prisma.pclass.update({
      where: { id: parseInt(req.params.clsid) },
      data: {
        day: day,
        discription: discription,
        sttime: timerange[0],
        endtime: timerange[1],
        fee: fee.toString(),
        grade: grade.toString(),
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

// tutor application form 🚗
Router.post("/tutorschoolreq", async (req, res) => {
  try {
    const { tutorid, discription, qualification, schools } = req.body;
    schools.forEach(async (sclid) => {
      let cls = await prisma.tutorschool_req.create({
        data: {
          discription: discription,
          qualification: qualification,
          schoolid: sclid,
          tutorid: tutorid,
        },
      });
      if (!cls) throw { status: 500, message: "Procces failed" };
    });
    res.json("done");
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// schools for application form (tutor) 🚗
Router.get("/school/:tutorid", async (req, res) => {
  try {
    const tut = await prisma.tutorschool_req.findMany({
      where: {
        tutorid: parseInt(req.params.tutorid),
        status: { not: enum_tutorschool_req.rejected },
      },
      select: { schoolid: true },
      distinct: ["schoolid"],
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

// get aprove or reject tutor 🚗
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

// get tutor reqs (scladmin) 🚗
Router.get("/tutorschoolreq/all/:sclid", async (req, res) => {
  try {
    const reqs = await prisma.tutorschool_req.findMany({
      where: { schoolid: parseInt(req.params.sclid) },
      select: {
        id: true,
        status: true,
        tutor: { select: { username: true, email: true } },
      },
    });
    if (!reqs) throw { status: 500, message: "Procces failed" };
    const pending = reqs.filter(
      (req) => req.status === enum_tutorschool_req.pending
    );
    const active = reqs.filter(
      (req) => req.status === enum_tutorschool_req.active
    );
    res.json({ pending, active });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// get tutor req detils bu reqid (scladmin modal) 🚗
Router.get("/tutorschoolreq/:reqid", async (req, res) => {
  try {
    const re = await prisma.tutorschool_req.findFirst({
      where: { id: parseInt(req.params.reqid) },
      select: {
        id: true,
        status: true,
        discription: true,
        qualification: true,
        tutor: {
          select: { username: true, email: true, phone: true, gender: true },
        },
      },
    });

    res.json(re);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// get enrolled class list for (student) 🚗
Router.get("/studenttution/:stuid", async (req, res) => {
  try {
    const re = await prisma.studenttution.findMany({
      where: {
        studentid: parseInt(req.params.stuid),
        status: enum_studenttution.active,
      },
      select: {
        pclass: {
          select: {
            id: true,
            grade: true,
            subject: true,
            tutor: { select: { username: true } },
          },
        },
      },
    });

    const cls = re.map((r) => {
      return {
        id: r.pclass.id,
        tutor: r.pclass.tutor.username,
        name: `${r.pclass.subject} | Grade ${r.pclass.grade}`,
      };
    });
    res.json(cls);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// student enroll  (student)
Router.post("/studenttution", async (req, res) => {
  try {
    const { stuid, pclassid } = req.body;
    const re = await prisma.studenttution.create({
      data: { studentid: stuid, pclassid: pclassid },
    });
    res.json(re);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// student list eka ganne meken  (tutor)
Router.get("/tutorpayment/all", async (req, res) => {
  try {
    const { month, pclassid } = req.body;
    const re = await prisma.tutorpayment.findMany({
      where: { pclassid: pclassid, month: month },
      select: {
        id: true,
        status: true,
        student: { select: { username: true, phone: true } },
      },
    });
    let paid = re.filter((r) => r.status !== enum_payment.notpaid);
    let notpaid = re.filter((r) => r.status === enum_payment.notpaid);
    res.json({ paid, notpaid });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// accept or reject student student  (tutor)
Router.patch("/studenttution/status", async (req, res) => {
  try {
    const { id, status } = req.body;
    const re = await prisma.studenttution.update({
      where: { id: id },
      data: { status: status },
    });
    res.json(re);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

// get enrolled students by class (tutor)
Router.get("/studenttution/class/:clsid", async (req, res) => {
  try {
    const active = await prisma.studenttution.findMany({
      where: {
        pclassid: parseInt(req.params.clsid),
        status: enum_studenttution.active,
      },
      select: {
        id: true,
        student: {
          select: {
            id: true,
            email: true,
            username: true,
            phone: true,
            adr: true,
            gender: true,
            school: { select: { name: true } },
          },
        },
      },
    });
    const pending = await prisma.studenttution.findMany({
      where: {
        pclassid: parseInt(req.params.clsid),
        status: enum_studenttution.pending,
      },
      select: {
        id: true,
        student: {
          select: {
            id: true,
            email: true,
            username: true,
            phone: true,
            adr: true,
            gender: true,
            school: { select: { name: true } },
          },
        },
      },
    });

    res.json({ active, pending });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

module.exports = Router;
