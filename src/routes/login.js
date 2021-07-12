const { Router } = require("express");
const authservice = require("../services/authentication.service");
// const User = require('../models/User')

const Route = Router();

Route.post("/", (req, res, next) => {
  authservice
    .authenticate(req.body)
    .then((user) => res.json(user))
    .catch(next);
});

Route.post("/register", (req, res, next) => {
  authservice
    .register(req.body)
    .then((user) => res.json(user))
    .catch(next);
});

Route.get("/register/school", (req, res, next) => {
  authservice
    .getAllSchools()
    .then((schools) => res.json(schools))
    .catch(next);
});

module.exports = Route;
