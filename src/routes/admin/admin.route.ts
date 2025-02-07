
import { Router } from "express";
import { createAdmin, deleteAdmin, getAllAdmins, getSingleAdmin, updateAdmin } from "../../controllers/admin/admin.controller";
import { imageUploader } from "../../middleware/uploader.middleware";
import { adminLogin, adminSelfDelete, adminSelfUpdate } from "../../controllers/admin/auth.admin.controller";
import { superAdminOnly } from "../../middleware/admin/admin.auth.middleware";

const adminRouter = Router()

//Admin auth routes 
adminRouter.post('/login', adminLogin)
adminRouter.put('/update', superAdminOnly,imageUploader().single('avatar'), adminSelfUpdate)
adminRouter.delete('/delete', superAdminOnly, adminSelfDelete)

adminRouter.get('/', superAdminOnly,getAllAdmins)
adminRouter.get('/:id', superAdminOnly, getSingleAdmin)
adminRouter.post('/',   superAdminOnly, imageUploader().single('avatar'), createAdmin)
adminRouter.put('/:id', superAdminOnly, imageUploader().single('avatar'), updateAdmin)
adminRouter.delete('/:id', superAdminOnly,deleteAdmin)




export default adminRouter