import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

const port = process.env.PORT || 5050;
const { FRONT_END } = process.env;

app.use(cors({ origin: FRONT_END }));
app.use(express.json());

app.use("/user");
app.use("/picks");
