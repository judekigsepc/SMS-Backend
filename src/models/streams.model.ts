import mongoose, { Schema, Types } from "mongoose"

import { IStream } from "../types/types"

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
},{timestamps:true})

const Stream = mongoose.model<IStream>('Stream',streamSchema)

export default Stream