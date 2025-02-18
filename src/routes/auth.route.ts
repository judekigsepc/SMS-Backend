import { Router } from "express";
import { loginUser } from "../controllers/users/auth.controller.js";

const authRouter = Router()

authRouter.post('/login', loginUser)

export default authRouter
