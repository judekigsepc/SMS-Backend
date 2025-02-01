
import mongoose,{Schema,Types} from "mongoose";

import { ISchool } from "../types";

const schoolSchema = new Schema<ISchool>({
    name:{
        type:String,
        required:true
    },
    logoUrl: {
        type:String,
        default:''
    },
    address: {
        type:String,
        required:true
    },
    contactEmail: {
        type:String,
        required:true
    },
    yearOfEstablishment: {
        type:Number,
        required:true
    },
    schoolType: {
        type:String,
        enum: ['private','government','NGO']
    },
    educationLevels: {
        type: [String],
        enum: ['nursery' , 'primary' , 'secondary' , 'tertiary' , 'other'],
        required:true
    },
    phoneNumbers: {
        type:[String],
        required:true
    }, 
    otherInfo: {
        type:Object,
        required:true
    }
},{timestamps:true})

const School = mongoose.model<ISchool>('School', schoolSchema)

export default School
