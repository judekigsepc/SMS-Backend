import mongoose, { Types,Schema } from "mongoose";

interface ILearner {
    userDetails: Types.ObjectId
    class: Types.ObjectId
    forSchool: Types.ObjectId
}

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
})

const Learner = mongoose.model<ILearner>('Learner', learnerSchema)

export default Learner

