import { Router } from "express";
import { imageUploader } from "../middleware/uploader.middleware.js";
import { superAdminOnly } from "../middleware/admin/admin.auth.middleware.js";
import { createSchoolAdmin, updateSchoolAdmin } from "../controllers/users/schoolAdmin.controller.js";

const schoolAdminRouter = Router()

const middlewareSet = [superAdminOnly, imageUploader().single('avatar')]

schoolAdminRouter.post('/', ...middlewareSet, createSchoolAdmin)
schoolAdminRouter.put('/:id',...middlewareSet, updateSchoolAdmin)

export default schoolAdminRouter