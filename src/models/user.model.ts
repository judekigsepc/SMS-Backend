
import mongoose,{Schema, Types} from "mongoose";

import { IUser } from "../types";

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
        required:false
    },
    isAdmin: {
        type:Boolean,
        default:false
    },
    password: {
        type:String,
        required:true
    },
    email: {
        type:String,
        default:''
    },
    forSchool: {
        type:Schema.Types.ObjectId,
        ref:'School',
        required:true
    }
},{timestamps:true})

const User = mongoose.model<IUser>('User', userSchema)

export default User


