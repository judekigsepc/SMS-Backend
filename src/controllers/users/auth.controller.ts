import { Request, Response } from "express"
import User from "../../models/users/user.model.js"
import { validateRequestBody } from "../../utils/validation/validate.js"
import { compare } from "bcrypt"
import jwt from 'jsonwebtoken'
import { crudErrorHandler, crudResultHandler } from "../../utils/handler.utils.js"
import { UserPayload } from "../../types/types.js"
import { getUserDetailsByRole } from "../../services/users.service.js"

export const loginUser = async (req: Request, res:Response) => {
    try {
        validateRequestBody('creation','user-login',req)

        const {identifier, password} = req.body
 
        const user = await User.findOne({
         $or:[
             {email:identifier},
             {phoneNumber: identifier},
             {userName: identifier},
             {studentId: identifier}
         ]
        })

        if(!user) {
            return crudErrorHandler(400,'User not found',{err: 'User with provided credentials not found'},res)
        }

        const isPasswordValid = await compare(password, user.password as string)
        if(!isPasswordValid){
            throw new Error('Wrong password provided. Check your password and try again')
        }
         
        const token = jwt.sign({id: user._id, role: user.role},process.env.JWT_SECRET as string,{expiresIn: '12h'})

        res.cookie('token', token, {
            httpOnly:true,
            secure:false, //I SHOULD SET THIS TO TRUE IN PROD
            sameSite:true
        })

        res.json({message:'Login successful',userType: user.role})
      
    }catch(err:unknown) {
         return crudErrorHandler(500, 'Login failed',err, res)
    }
}

export const getUserDetails = async (req:Request, res:Response) => {
       try {
           const token  = req.cookies.token

           if(!token) {
               return crudErrorHandler(401,'Access denied',{err:'User not authenticated. Try logging in again'},res)
           }

           const payload = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload
 
           const userDetails = await getUserDetailsByRole(payload.role, payload.id)
        
           return crudResultHandler(200,'User details fetched suceesfuly', userDetails,res)

       }catch(err: unknown) {
          return crudErrorHandler(500, 'Failed to fetch user details',err, res)
       }
}