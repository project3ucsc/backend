const express = require("express");
const Router = express.Router();
const notificationservice = require("../services/notification.service");

Router.get("/:userid", async (req, res) => {
  try {
    const data = await notificationservice.getNotifications(
      parseInt(req.params.userid)
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
    const data = await notificationservice.addNotification(req.body);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});
//  delete
Router.delete("/:notiid", async (req, res) => {
  try {
    const data = await notificationservice.deleteNotification(
      parseInt(req.params.notiid)
    );
    console.log(data);
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
});
//  update
Router.patch("/:notiid", async (req, res) => {
  try {
    const data = await notificationservice.patchNotification(
      parseInt(req.params.notiid),
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
