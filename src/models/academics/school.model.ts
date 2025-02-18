
import mongoose,{Schema,Types} from "mongoose";

import { ISchool } from "../../types/types.js";

const schoolSchema = new Schema<ISchool>({
    name:{
        type:String,
        required:true
    },
    logo: {
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
        enum: ['private','government','NGO','other']
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
        default: {}
    }
},{timestamps:true})

const School = mongoose.model<ISchool>('School', schoolSchema)

export default School
