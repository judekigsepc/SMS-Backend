
import mongoose,{Schema,Types} from "mongoose";

import { ISchoolAdmin } from "../types/types.js";

const schoolAdmin = new Schema<ISchoolAdmin>({
    userDetails: {
       type: Schema.Types.ObjectId,
       ref:'User',
       required:true
    },
    role: {
        type: String,
        required: true
    }
})

const SchoolAdmin = mongoose.model<ISchoolAdmin>('SchoolAdmin', schoolAdmin)

export default SchoolAdmin