import express from "express";
import cors from "cors";
import foodRouter from "./routes/foodRoute.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes endpoints
app.use("/chewster-api/food", foodRouter);

//mounted the uploads folder and can access any image from this endpoint via /food-images/:img tag
app.use("/food-images", express.static("uploads"));

export default app;
