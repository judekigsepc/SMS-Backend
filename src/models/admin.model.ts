import mongoose, { Schema } from "mongoose";
import { IAdmin } from "../types";

const adminSchema = new Schema<IAdmin>({
      firstName: {
        type:String,
        required:true
      },
      lastName: {
        type:String,
        required:true
      },
      password: {
        type:String,
        required:true
      },
      email: {
        type:String,
        required:true
      },
      phoneNumber: {
        type:String,
        required:true
      },
      avatar: {
        type:String,
        required:true
      }
})

const Admin = mongoose.model<IAdmin>('Admin', adminSchema)

export default Admin