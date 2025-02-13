import mongoose, {Types, Schema} from 'mongoose'

import { ITerm } from '../types/types.js'

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
},{timestamps:true})

const Term = mongoose.model<ITerm>('Stream', streamSchema)

export default Term