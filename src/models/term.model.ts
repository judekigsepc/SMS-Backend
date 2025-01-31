import mongoose, {Types, Schema} from 'mongoose'

interface ITerm {
    name:string
    forSchool:Types.ObjectId
}

const streamSchema = new Schema<ITerm>({
    name:{
        type:String,
        required:true
    },
    forSchool: {
        type:Schema.Types.ObjectId,
        ref:'School',
        required:true
    }
})

const Term = mongoose.model<ITerm>('Stream', streamSchema)

export default Term