import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// created the url route to the backend uploads page
app.use(
  "/food-images",
  express.static(path.join(__dirname, "../Backend/uploads"))
);

// Routes endpoints
app.use("/chewster-api/food", foodRouter);

app.use("/chewster-api/user", userRouter);

app.use("/chewster-api/cart", cartRouter);

app.use("/chewster-api/order", orderRouter);

export default app;
