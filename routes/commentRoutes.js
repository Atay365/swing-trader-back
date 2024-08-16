import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import dotenv from "dotenv";
import axios from "axios";

const knex = initKnex(configuration);
const commentRouter = express.Router();
const API_KEY = process.env.API_KEY;

// GET all comments for specific prediction
commentRouter.get("/picks/:pickId/comments", async (req, res) => {
  const pickId = req.params.id;
  try {
    const commentData = await knex("comment").where({ pickId: pickId });
  } catch (error) {
    console.error("Error fetching the comments for this pick");
    res.status(500).json({ error: "No data found" });
  }
});

// Add a comment to the prediction
commentRouter.post("/newcomment", async (res, req) => {
  try {
    const { commentText, timestamp } = req.body;
    const newcomment = await knex("comment").insert({
      commentText,
      timestamp,
    });
    res.status(201).json({ message: "Comment posted successfully!" });
  } catch (error) {
    console.error("Error adding comment");
    res.status(500).json({ error: "Failed to add new comment" });
  }
});

// ! Edit a comment
// commentRouter.put("/comment/:id", async (res, req) => {});

// ! Delete Comment
// commentRouter.delete("/comment/:id", async (res, req) => {
//   const id = req.params.id;
//   const userId = req;
//   try {
//     await knex("comment").where({ id: id });
//   } catch (error) {}
// });
export default commentRouter;
