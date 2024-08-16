import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import commentRouter from "./routes/commentRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import pickRouter from "./routes/pickRoutes.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 5050;
const API_KEY = process.env.API_KEY;
const { FRONT_END } = process.env;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(cors({ origin: FRONT_END }));
app.use(express.json());

// app.use("/user");
app.use("/picks", pickRouter);
app.use("/comment", commentRouter);
app.use("/dash", dashboardRouter);

// Aplha Vanatge Stock API Get
app.get("/api/stocks", async (req, res) => {
  try {
    const { searchSymbol } = req.query;
    const stockSearch = await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: "SYMBOL_SEARCH",
        keywords: searchSymbol,
        apikey: API_KEY,
      },
    });
    res.json(stockSearch.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
