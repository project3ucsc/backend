const express = require("express");
const Router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

Router.get("/", async (req, res) => {
  try {
    const freeprogs = await prisma.freeprogs.findMany({});

    res.json(freeprogs);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});

Router.post("/suggest/:userid", async (req, res) => {
  try {
     const userid = parseInt(req.params.userid);
     const freeProg = await prisma.freeprogs_suggetions.create({
      data: {
          user_id: userid,
          progtitle: req.body.progname,
          discription: req.body.description,
          grade : `${req.body.grade}`,
          channel: req.body.channel,
          subject: req.body.subject,
          day : req.body.day,
          starttime: req.body.timeRange[0],
          endtime: req.body.timeRange[1],
          type: req.body.mediaType
      },
    });
    
     res.json(freeProg);
     //console.log(freeProg);
      // res.json("Okay");
  }
  catch(err){
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});


module.exports = Router;
