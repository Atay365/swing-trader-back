import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import dotenv from "dotenv";
import axios from "axios";

const knex = initKnex(configuration);
const dashboardRouter = express.Router();

// All metrics for the dashboard
dashboardRouter.get("/:id/dashboard", async (res, req) => {
  const userId = req.params.id;
  try {
    const totalPicks = await knex("pick")
      .where({ userId: userId })
      .count("* as totalPicks");

    const accRate = await knex("pick")
      .where({ userId: userId, actualResult: "CORRECT" / totalPicks })
      .count("*");

    const totalScore = await knex("pick")
      .where({ userId: userId })
      .sum({ scoreImpact });
  } catch (error) {}
});
