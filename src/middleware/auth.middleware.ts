import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { crudErrorHandler } from "../utils/handler.utils.js";
import User from "../models/users/user.model.js";
import { UserPayload, ValidPermissions } from "../types/types.js";


export const authenticateUser = async (req:Request, res: Response, next: NextFunction) => {
       try {

         const token = req.cookies.token

         if(!token) {
              res.status(401).json({
                     message:'Acces denied',
                     details:'No jwt token found'
              })
              return
         }

         const payload = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload

         const userData = await User.findOne({_id: payload.id})

         if(!userData) {
              throw new Error('User not found')
         }

         req.user = userData

         next()
         return

       }catch (err: unknown) {
          return crudErrorHandler(401, 'Authentication failed', err, res)           
       }
}

export const checkPermissions =  (permission: ValidPermissions) => {
return (req:Request, res:Response, next: NextFunction) => {
       try {
              if(!req.user) {
                  throw new Error('Not authenticated. Try logging in again')
              }

              const userPermissions: string [] = req.user.permissions
       
              if(userPermissions.includes('all')) {
                   next()
                   return
              }

              if(!userPermissions.includes(permission))  {
                     return crudErrorHandler(401,'Authentication failed: Access denied',{err:'No permission to access resource'},res)
              }
              
              next()
              return
          }catch(err: unknown) {
              return crudErrorHandler(401, 'Authentication failed', err, res)           
          }    
}
}

