import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import dotenv from "dotenv";
import axios from "axios";

const knex = initKnex(configuration);
const pickRouter = express.Router();
const API_KEY = process.env.API_KEY;

// Retrieve details of a specific pick (predictions)

pickRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Id is:", id);
  try {
    const pickData = await knex("pick").where({ id: id });
    res.json(pickData);
  } catch (error) {
    console.error("Error fetching pick data", error);
    res.status(500).json({ error: "Fetching data error" });
  }
});

// Get entire list of picks for that user
pickRouter.get("/:userid/picks", async (res, req) => {
  const userid = req.params.userid;
  try {
    const userPickData = await knex("pick").where({ userid: userid });
    res.json(userPickData);
  } catch (error) {
    console.error("Error fetching users picks");
    res.status(500).json({ error: "Couldnt fetch data" });
  }
});

// POST for placing pick predicitions
pickRouter.post("/picks", async (res, req) => {
  try {
    const { userid, stockSymbol, predictionDirection, predictionDate, status } =
      req.body;
    const pickDate = new Date().toISOString().split("T")[0];
    const stockDetails = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: "TIME_SERIES_DAILY",
        symbol: stockSymbol,
        apikey: API_KEY,
      },
    });

    // Extract the initial price (closing price for the most recent date)
    const timeSeries = stockDetails.data["Time Series (Daily)"];
    const mostRecentDate = Object.keys(timeSeries)[0]; // Get the most recent date
    const initialPrice = timeSeries[mostRecentDate]["4. close"]; // Extract the closing

    await knex("pick").insert({
      userid,
      stockSymbol,
      predictionDirection,
      predictionDate: pickDate,
      initialPrice: initialPrice,
    });

    res.status(201).json({ message: "Pick successfully placed!" });
  } catch (error) {
    console.error("Error placing pick:", error);
    res.status(500).json({ error: "Failed to place pick" });
  }
});

// Delete the pick before deadline
pickRouter.delete("/picks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await knex("pick").where({ id: id, status: "PENDING" });
  } catch (error) {
    console.error("Error deleting pick");
    res.status(500).json({ error: "Failed to delete" });
  }
});

export default pickRouter;
