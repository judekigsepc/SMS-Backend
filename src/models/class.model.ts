
import mongoose,{Schema, Types} from "mongoose";
import { IClass } from "../types/types";

const classSchema = new Schema<IClass>({
    name: {
        type:String,
        required:true
    },
    forSchool: {
        type:Schema.Types.ObjectId,
        ref:'School',
        required:true
    },
    subjects: {
        type:[Schema.Types.ObjectId],
        required:true
    }
},{timestamps:true})

const Class = mongoose.model<IClass>('Class', classSchema)

export default Class