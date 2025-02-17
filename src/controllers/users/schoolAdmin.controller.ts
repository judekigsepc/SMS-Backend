import { Request, Response } from "express";
import { validateRequestBody } from "../../utils/validation/validate.js";
import { crudErrorHandler, crudResultHandler } from "../../utils/handler.utils.js";
import SchoolAdmin from "../../models/schoolAdmin.model.js";
import { createUser, updateUser } from "../../services/users.service.js";

export const createSchoolAdmin = async (req: Request, res: Response) => {
    try {
           req.body.isAdmin = true
           const adminUserData = await createUser(req)
           validateRequestBody('creation', 'school-admin',req)

           const {role} = req.body

           const admin = (await SchoolAdmin.create({userDetails: adminUserData._id, role}))

           admin.populate('userDetails', 'firstName lastName email forSchool')
           return crudResultHandler(201,'School admin created successfuly',admin,res)
    }
    catch(error: unknown) {
        return crudErrorHandler(500,'Failed to create school admin',error,res)
    }
}

export const updateSchoolAdmin = async (req:Request, res: Response) => {
    try {  
        const {id} = req.params

        const adminToUpdate = await SchoolAdmin.findById(id)

        if(!adminToUpdate) {
            return crudErrorHandler(400,'School Admin account not found for update', {error:'School admin account not found'},res)
        }

        validateRequestBody('update','school-admin',req)

        await SchoolAdmin.findByIdAndUpdate(id, req.body, { new: true });
        await updateUser(adminToUpdate.userDetails, req);

        const updatedAdmin = await SchoolAdmin.findById(id).populate('userDetails', 'firstName lastName email forSchool')

        return crudResultHandler(200,'School Admin updated successfuly',updatedAdmin,res)
    }
    catch (error: unknown) {
       crudErrorHandler(500, 'School Admin update failed', error, res)
    }
}

export const deleteSchoolAdmin = async (req:Request, res:Response) => {
    try {

    }catch(error: unknown) {
        crudErrorHandler(500, 'School Admin deletion failed',error, res)
    }
}