import { Request, Response } from "express"
import User from "../../models/users/user.model.js"
import { validateRequestBody } from "../../utils/validation/validate.js"
import { compare } from "bcrypt"
import jwt from 'jsonwebtoken'
import { crudErrorHandler } from "../../utils/handler.utils.js"

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
            throw new Error('Invalid password provided. Check your password and try again')
        }
         
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET as string,{expiresIn: '12h'})

        res.json({
            userType: user.role,
            token
        })
      
    }catch(err:unknown) {
         return crudErrorHandler(500, 'User login failed',err, res)
    }
}