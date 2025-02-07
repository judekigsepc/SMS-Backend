import { Router } from "express";
import { addSchool, deleteSchool, getAllSchools, getSingleSchool, updateSchool } from "../controllers/admin/school.controller";
import { imageUploader } from "../middleware/uploader.middleware";
import { superAdminOnly } from "../middleware/admin/admin.auth.middleware";

const schoolRouter = Router()

schoolRouter.get('/',  superAdminOnly,  getAllSchools)
schoolRouter.get('/:id', superAdminOnly, getSingleSchool)
schoolRouter.post('/', [superAdminOnly,imageUploader().single('logo')] ,addSchool)
schoolRouter.put('/:id', [superAdminOnly, imageUploader().single('logo')] ,updateSchool)
schoolRouter.delete('/:id', superAdminOnly, deleteSchool)

export default schoolRouter