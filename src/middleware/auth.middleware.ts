import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Types } from "mongoose";
import { crudErrorHandler } from "../utils/handler.utils.js";
import User from "../models/users/user.model.js";

interface UserPayload extends JwtPayload {
       id: Types.ObjectId
       role: string
}

export const authMiddleware = async (req:Request, res: Response, next: NextFunction) => {
       try {
         const authHeader = req.headers.authorization

         if(!authHeader) {
              res.status(500).json({
                    authError:'No token provided'
              })
              return
         }

         const token = authHeader.split(" ")[1]

         const payload = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload

         const userData = await User.find(payload.id)

         req.user = userData

         next()
       }catch (err: unknown) {
          return crudErrorHandler(403, 'Authentication failed', err, res)           
       }
}

export const checkPermissions =  async (permission: string) => {
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
          }catch(err: unknown) {
              return crudErrorHandler(403, 'Authentication failed', err, res)           
          }    
}
}

