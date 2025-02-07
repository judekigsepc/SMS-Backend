import mongoose, { Types,Schema } from "mongoose";

import { ILearner } from "../types/types";

const learnerSchema = new Schema<ILearner>({
    userDetails:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    class:{
        type:Schema.Types.ObjectId,
        ref:'Class',
        required: true
    },
    forSchool:{
        type:Schema.Types.ObjectId,
        ref:'Class',
        required: true
    }
},{timestamps:true})

const Learner = mongoose.model<ILearner>('Learner', learnerSchema)

export default Learner

