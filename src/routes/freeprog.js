const express = require("express");
const Router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

Router.get("/", async (req, res) => {
  try {
    const freeprogs = await prisma.freeprogs.findMany({});

    res.json(freeprogs);
  } catch (error) {
    res.json({ err: error });
  }
});

module.exports = Router;
