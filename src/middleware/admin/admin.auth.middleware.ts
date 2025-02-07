import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { crudErrorHandler } from '../../utils/handler.utils'
interface AdminPayload extends JwtPayload {
    id:string,
    isAdmin:boolean
}

export const superAdminOnly = (req:Request, res:Response, next: NextFunction):void => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader) {
        return crudErrorHandler(403,'Authorisation failed',{err:'No token provided'},res)
        }

        const token = authHeader.split(" ")[1]
        const payload = jwt.verify(token,process.env.JWT_SECRET as string ) as AdminPayload

        // console.log(payload)
        if(!payload.isSuperAdmin) {
           return crudErrorHandler(403,'Access denied',{err: 'User is not admin'},res)
        }
 
        req.user = payload
        next()

    }catch(err: unknown) {
        return crudErrorHandler(403,'Authorisation failed',{err: err},res)
    }
} 