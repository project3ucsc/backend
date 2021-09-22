const express = require("express");
require("dotenv/config");
const app = express();
// const mongoose = require("mongoose")
const jwt = require("./helpers/jwt");

const cors = require("cors");
const bodyparser = require("body-parser");

app.use(cors());
app.use(bodyparser.json());

app.use(jwt());

// Route import
// const userRoute = require('./routes/user')
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
const classesRoute = require("./routes/classes");
const subjectdetailRoute = require("./routes/subjectdetail");
const periodRoute = require("./routes/period");
const timeslotRoute = require("./routes/timeslot");
const assmntRoute = require("./routes/assmnt");
const notificationRoute = require("./routes/notification");
const releifRoute = require("./routes/relief");
const tutorRoute = require("./routes/tutor");
const tutorsubjectRoute = require("./routes/tutorsubject");
const passmntRoute = require("./routes/passmnt");
const attendanceRoute = require("./routes/attendance");

const freeprogRoute = require("./routes/freeprog");

app.use("/login", loginRoute);
app.use("/user", userRoute);
app.use("/classes", classesRoute);
app.use("/subjectdetail", subjectdetailRoute);
app.use("/period", periodRoute);
app.use("/timeslot", timeslotRoute);
app.use("/assmnt", assmntRoute);
app.use("/notification", notificationRoute);
app.use("/relief", releifRoute);
app.use("/tutor", tutorRoute);
app.use("/tutorsubject", tutorsubjectRoute);
app.use("/passmnt", passmntRoute);
app.use("/attendance", attendanceRoute);

app.use("/freeprog", freeprogRoute);
// app.use('/user', userRoute)

// ROUTES
app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello this is knowledge-hub API");
});

//SERVER
const port = process.env.PORT || 1337;
app.listen(port);
console.log("server listening at port " + process.env.PORT);
