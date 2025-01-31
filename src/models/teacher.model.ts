import mongoose,{Schema,Types} from "mongoose";

interface ITeacher {
    userDetails:Types.ObjectId
    classes: Types.ObjectId []
    subjects: Types.ObjectId []
    forSchool: Types.ObjectId
}

const teacherSchema = new Schema<ITeacher>({
    userDetails: {
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    classes: {
        type: [Schema.Types.ObjectId],
        ref:'Class',
        required:true
    },
    subjects:{
        type: [Schema.Types.ObjectId],
        ref:'Subject',
        required:true
    },
    forSchool: {
        type:Schema.Types.ObjectId,
        ref:'School',
        required: true
    }
})

const Teacher = mongoose.model<ITeacher>('Teacher', teacherSchema)

export default Teacher