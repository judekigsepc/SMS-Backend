import mongoose, { Schema, Types } from "mongoose"

interface IStream {
    name:string
    forSchool:Types.ObjectId
}

const streamSchema = new Schema<IStream>({
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

const Stream = mongoose.model<IStream>('Stream',streamSchema)

export default Stream