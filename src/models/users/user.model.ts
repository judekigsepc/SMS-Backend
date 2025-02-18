
import mongoose,{Schema, Types} from "mongoose";

import { IUser } from "../../types/types.js";

//TODO: ADD PERMISSIONS TO USERS HERE

const userSchema = new Schema<IUser>({
    firstName:{
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    otherNames: {
        type:String,
    },
    password: {
        type:String,
        required:true
    },
    email: {
        type:String,
        unique:true,
        default:''
    },
    avatar: {
        type:String,
        default:''
    },
    forSchool: {
        type:Schema.Types.ObjectId,
        ref:'School',
        required:true
    },
    studentId: {
        type: String,  
    },
    role: {
        type: [String],
        enum: ['admin','teacher'],
        required: true
    },
    permissions: {
        type: [String],
        enum: ['all'],
        required: true
    }
},{timestamps:true})

const User = mongoose.model<IUser>('User', userSchema)

export default User


