import { Request, Response } from "express";
import { crudErrorHandler, crudResultHandler, fileDeleteHandler } from "../../utils/handler.utils";
import { validateRequestBody } from "../../utils/validation/validate";
import bcrypt from 'bcrypt'
import Admin from "../../models/admin.model";

export const createAdmin = async (req:Request, res:Response):Promise<void> => {
       try {
          validateRequestBody('creation','admin',req)

          const {userName} = req.body

          const existingUser = await Admin.findOne({userName})
          
          if(existingUser) {
            throw new Error('Admin with the same username already exists')
          }

          if(req.file) {
             req.body.avatar = req.file.filename
          }

          const hashedPassword = await bcrypt.hash(req.body.password, 10)

          req.body.password = hashedPassword
          const createdAdmin = await Admin.create(req.body)

          crudResultHandler(201,'Admin created successfuly',createdAdmin,res)

       }catch(err:Error | unknown ) {
          crudErrorHandler(500,'Admin user creation failed',err,res)
       }
}


export const updateAdmin = async (req:Request, res:Response):Promise<void> => {
    try {
        validateRequestBody('update','admin',req)

        const {id} = req.params

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

        fileDeleteHandler('images',req.file?.filename)
        crudErrorHandler(500,'Admin update failed',err,res)
    }
}



export const deleteAdmin = async (req:Request, res:Response):Promise<void> => {
    try {
       const {id} = req.params

       const adminToDelete = await Admin.findById(id)
       if(!adminToDelete) {
        return crudErrorHandler(404,'Admin deletion failed- Admin account not found',{err:'Admin account not found'},res)
       }

       const deletedAdmin = await Admin.findByIdAndDelete(id)
       fileDeleteHandler('images',deletedAdmin?.avatar)

       crudResultHandler(200,'Admin deleted successfuly', deletedAdmin,res)

    }catch(err:Error |unknown) {
         crudErrorHandler(500,'Admin deletion failed',err,res)
    }
}



export const getAllAdmins = async (req:Request, res:Response):Promise<void> => {
    try {
        const allAdmins = await Admin.find({}).lean()

        if(allAdmins.length < 1) {
            return crudErrorHandler(404,'Admin retrieval failed',{err:'No admin accounts found'},res)
        }

        crudResultHandler(200,'All admins retrieved successfuly',allAdmins,res)

    }catch (err: Error | unknown){

        crudErrorHandler(500,'Admin accounts retrieval failed',err,res)
    }
}


export const getSingleAdmin = async (req:Request, res:Response):Promise<void> => {
    try {
        const {id} = req.params

        const admin = await Admin.findById(id).lean()

        if(!admin) {
            return crudErrorHandler(404,'Admin retrieval failed',{err:'Admin account not found'},res)
        }

        crudResultHandler(200,'Admin retrieved successfuly',admin,res) 
    }catch (err: Error | unknown) {
        crudErrorHandler(500,'Admin account retrieval failed',err,res)
    }
}



