import { Request, Response } from "express";
import { IAdmin } from "../../types/types.js";
import Admin from '../../models/admin/admin.model.js'
import bcrypt from 'bcrypt'
import {crudErrorHandler, crudResultHandler, fileDeleteHandler} from '../../utils/handler.utils.js'
import jwt from 'jsonwebtoken'
import { validateRequestBody } from "../../utils/validation/validate.js";

export const adminLogin = async (req:Request, res: Response): Promise<void> => {
    try {
        validateRequestBody('creation','admin-login',req)

        const {userName, password} = req.body

        const user = await Admin.findOne({userName})
        if(!user) {
            throw new Error('Super admin account not found')
        }

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

export const adminSelfUpdate = async (req:Request, res: Response): Promise<void> => {
    try {
        validateRequestBody('update','admin-login',req)

        const {id} = req.user
        console.log(id)

        const adminToUpdate = await Admin.findById(id)

        if(!adminToUpdate) {
            fileDeleteHandler('images',req.file?.filename)
            return crudErrorHandler(404,'Admin update failed',{err:'Admin account not found'},res)
        }
            
        req.file ? req.body.avatar = req.file.filename: ''
        
        if(req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(id,req.body,{new:true})

        req.file? fileDeleteHandler('images',adminToUpdate.avatar): ''

        crudResultHandler(200,'Admin updated successfuly',updatedAdmin,res)

    }catch(err: Error | unknown) {
        return crudErrorHandler(500,'Admin self update failed',err,res)
    }
}

export const adminSelfDelete = async (req:Request, res: Response): Promise<void> => {
    try {
        const {id} = req.user

       const adminToDelete = await Admin.findById(id)

       if(!adminToDelete) {
        return crudErrorHandler(404,'Admin deletion failed- Admin account not found',{err:'Admin account not found'},res)
       }

       const deletedAdmin = await Admin.findByIdAndDelete(id)
       fileDeleteHandler('images',deletedAdmin?.avatar)

       crudResultHandler(200,'Admin deleted successfuly', deletedAdmin,res)

    }catch(err: Error | unknown) {
        crudErrorHandler(500,'Admin deletion failed',err,res)
    }
}