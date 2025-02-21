import { Router } from "express";
import { getUserDetails, loginUser } from "../../controllers/users/auth.controller.js";

const authRouter = Router()

authRouter.post('/login', loginUser)
authRouter.get('/me', getUserDetails)

export default authRouter
