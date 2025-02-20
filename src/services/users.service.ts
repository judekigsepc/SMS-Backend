import { Request } from "express"
import { validateRequestBody } from "../utils/validation/validate.js"
import { fileDeleteHandler } from "../utils/handler.utils.js"
import { Model, Types } from "mongoose"
import bcrypt from 'bcrypt'
import { ValidUserRoles } from "../types/types.js"

import User from "../models/users/user.model.js"
import Teacher from "../models/users/teacher.model.js"
import SchoolAdmin from "../models/users/schoolAdmin.model.js"
import Learner from "../models/users/learner.model.js"
import Parent from "../models/users/parent.model.js"

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

export const getUserDetailsByRole = async (role:ValidUserRoles, id:Types.ObjectId) => {
   try {
        const userModelMap: Record <ValidUserRoles, Model<any>>= {
         'admin': SchoolAdmin,
         'teacher': Teacher,
         'learner': Learner,
         'parent' : Parent
        }

        const userData = await userModelMap[role].findOne({userDetails: id})
                               .populate('userDetails')

        if(!userData) {
         throw new Error('User with provided credentials not found')
        }

        return userData
   }catch(err: unknown) {
      throw err
   }
}