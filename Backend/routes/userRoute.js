import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

//register user endpoint
userRouter.post("/register", registerUser);

//login user endpoint
userRouter.post("/login", loginUser);

export default userRouter;
