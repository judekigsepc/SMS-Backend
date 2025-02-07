import mongoose,{Schema, Types} from "mongoose"

import { ISubject } from "../types/types"

const subjectSchema = new Schema<ISubject>({
    name:{
        type:String,
        required:true
    },
    forSchool:{
        type: Schema.Types.ObjectId,
        ref:'School',
        required:true
    }
},{timestamps:true})

const Subject = mongoose.model<ISubject>('Subject', subjectSchema)

export default Subject