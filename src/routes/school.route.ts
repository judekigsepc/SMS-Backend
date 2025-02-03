import { Router } from "express";
import { addSchool, deleteSchool, getAllSchools, getSingleSchool, updateSchool } from "../controllers/school.controller";
import { imageUploader } from "../middleware/uploader.middleware";

const schoolRouter = Router()

schoolRouter.get('/', getAllSchools)
schoolRouter.get('/:id', getSingleSchool)
schoolRouter.post('/', imageUploader().single('logo') ,addSchool)
schoolRouter.put('/:id',imageUploader().single('logo'),updateSchool)
schoolRouter.delete('/:id', deleteSchool)

export default schoolRouter