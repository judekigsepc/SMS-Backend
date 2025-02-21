import { Router } from "express";
import { imageUploader } from "../../middleware/uploader.middleware.js";
import { superAdminOnly } from "../../middleware/admin/admin.auth.middleware.js";
import { createSchoolAdmin, deleteSchoolAdmin, getAllSchoolAdmins, getSingleSchoolAdmin, updateSchoolAdmin } from "../../controllers/users/schoolAdmin.controller.js";

const schoolAdminRouter = Router()

const middlewareSet = [superAdminOnly, imageUploader().single('avatar')]

schoolAdminRouter.post('/', ...middlewareSet, createSchoolAdmin)
schoolAdminRouter.put('/:id',...middlewareSet, updateSchoolAdmin)
schoolAdminRouter.delete('/:id', superAdminOnly ,deleteSchoolAdmin)
schoolAdminRouter.get('/', superAdminOnly, getAllSchoolAdmins)
schoolAdminRouter.get('/:id', superAdminOnly, getSingleSchoolAdmin)

export default schoolAdminRouter