import mongoose, { Schema, Types } from "mongoose";

interface IParent {
    userDetails: Types.ObjectId
    forLearner: Types.ObjectId
    forSchool: Types.ObjectId
}

const parentSchema = new Schema<IParent>({
    userDetails:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    forLearner:{
        type:Schema.Types.ObjectId,
        ref:'Learner',
        required:true
    },
    forSchool:{
        type:Schema.Types.ObjectId,
        ref:'School',
        required:true
    }
})

const Parent = mongoose.model<IParent>('Parent', parentSchema)

export default Parent