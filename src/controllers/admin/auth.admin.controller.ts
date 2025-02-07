import { Request, Response } from "express";
import { IAdmin } from "../../types/types";
import Admin from '../../models/admin.model'
import bcrypt from 'bcrypt'
import {crudErrorHandler} from '../../utils/handler.utils'
import jwt from 'jsonwebtoken'
import { validateRequestBody } from "../../utils/validation/validate";

export const adminLogin = async (req:Request, res: Response): Promise<void> => {
    try {
        validateRequestBody('creation','admin-login',req)

        const {userName, password} = req.body

        const user = await Admin.findOne({userName})

        const userPayload = {id:user?._id, isSuperAdmin:true}
        const isPasswordValid = await bcrypt.compare(password, user? user.password : '')

        // console.log(user, isPasswordValid)
        if(!isPasswordValid) {
            throw new Error('Invalid password')
        }
        
        const token = jwt.sign(userPayload,process.env.JWT_SECRET? process.env.JWT_SECRET: '',{expiresIn: '24h'})

        res.json({token})
        
    }catch(err: Error | unknown) {
          return crudErrorHandler(500,'Login failed',err,res)
    }
}

const adminSelfUpdate = async (req:Request, res: Response): Promise<void> => {
    try {

    }catch(err: Error | unknown) {
        
    }
}

const adminSelfDelete = async (req:Request, res: Response): Promise<void> => {
    try {

    }catch(err: Error | unknown) {
        
    }
}