import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Types } from "mongoose";

interface UserPayload extends JwtPayload {
       id: Types.ObjectId
}

export const authMiddleware = (req:Request, res: Response, next: NextFunction) => {
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

       }catch{
                    
       }
}