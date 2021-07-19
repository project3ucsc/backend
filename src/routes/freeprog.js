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

module.exports = Router;
