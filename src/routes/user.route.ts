import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.get('/', getAllUsers)
userRouter.get('/:id', getSingleUser)
userRouter.post('/', createUser)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)