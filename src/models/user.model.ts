
import mongoose,{Schema, Types} from "mongoose";

interface IUser {
    firstName: string
    lastName:string
    otherNames?:string
    password?:string
    isAdmin: boolean
    email:string
    forSchool: Types.ObjectId
}

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
})

const User = mongoose.model<IUser>('User', userSchema)

export default User


