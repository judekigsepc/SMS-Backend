import mongoose,{Schema, Types} from "mongoose"

interface ISubject {
    name:string,
    forSchool:Types.ObjectId
}

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
})

const Subject = mongoose.model<ISubject>('Subject', subjectSchema)

export default Subject