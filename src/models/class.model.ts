
import mongoose,{Schema, Types} from "mongoose";

interface IClass {
    name:string
    forSchool:Types.ObjectId
    subjects: Types.ObjectId []
}

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
})

const Class = mongoose.model<IClass>('Class', classSchema)

export default Class