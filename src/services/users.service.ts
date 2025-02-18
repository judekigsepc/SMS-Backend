import User from "../models/users/user.model.js"
import { Request } from "express"
import { validateRequestBody } from "../utils/validation/validate.js"
import { fileDeleteHandler } from "../utils/handler.utils.js"
import { Types } from "mongoose"
import bcrypt from 'bcrypt'

export const createUser = async (req:Request) => {
       try {
          validateRequestBody('creation', 'user', req)

          if(req.file) {
            req.body.avatar = req.file.filename
          }

          req.body.password = await bcrypt.hash(req.body.password, 10)
          const userData = await User.create(req.body)

          return userData

       }catch(err: unknown) {
          fileDeleteHandler('images',req.file?.filename)
          throw err
       }
}

export const updateUser = async (id: Types.ObjectId ,req:Request) => {
   try {

         validateRequestBody('update', 'user', req)
            
         const userToUpdate = await User.findById(id)

         if(!userToUpdate) {
            throw new Error('User to update not found')
         }

          if(req.file) {
             req.body.avatar = req.file.filename
          }

          req.body.password = await bcrypt.hash(req.body.password, 10)

         const updatedUserData = await User.findByIdAndUpdate(id,req.body, {new:true})
         
         fileDeleteHandler('images',userToUpdate.avatar)

         return updatedUserData

   }catch(err: unknown) {
      fileDeleteHandler('images',req.file?.filename)
      throw err
   }
}

export const deleteUser = async (id:Types.ObjectId) => {
   try { 

      const userToDelete = await User.findById(id)
 
      if(!userToDelete) {
         throw new Error('User to delete not found')
      }

      const deletedUser = await User.findByIdAndDelete(id)

      return deletedUser

   }catch(err: unknown) {
      throw err
   }
}