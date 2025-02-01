import { Router } from "express";
import { addSchool, deleteSchool, getAllSchools, getSingleSchool, updateSchool } from "../controllers/school.controller";
import { imageUploader } from "../middleware/uploader.middleware";

const schoolRouter = Router()

schoolRouter.get('/', getAllSchools)
schoolRouter.get('/:id', getSingleSchool)
schoolRouter.post('/',addSchool)
schoolRouter.put('/:id',updateSchool)
schoolRouter.delete('/:id', deleteSchool)

export default schoolRouter