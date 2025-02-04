
import { Router } from "express";
import { createAdmin, deleteAdmin, getAllAdmins, getSingleAdmin, updateAdmin } from "../controllers/admin/admin.controller";
import { imageUploader } from "../middleware/uploader.middleware";

const adminRouter = Router()

adminRouter.get('/', getAllAdmins)
adminRouter.get('/:id', getSingleAdmin)
adminRouter.post('/',   imageUploader().single('avatar') ,createAdmin)
adminRouter.put('/:id', imageUploader().single('avatar'), updateAdmin)
adminRouter.delete('/:id', deleteAdmin)

export default adminRouter