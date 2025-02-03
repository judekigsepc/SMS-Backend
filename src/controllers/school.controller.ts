
import { Request, Response } from "express";
import School from "../models/school.model";
import { crudErrorHandler, crudResultHandler, fileDeleteHandler } from "../utils/handler.utils";
import { validateRequestBody } from "../utils/validation/validate";

export const getAllSchools = async (req:Request, res:Response):Promise<void> => {
       try {
           const allSchools = await School.find({}).lean()

           if(allSchools.length< 1) {
            return crudErrorHandler(404,'Failed to retrieve all schools',{msg:'No schools found in Database'},res)
           }  

           return crudResultHandler(200,'All Schools retrieved successfuly',allSchools,res)

       }catch(err: Error | unknown) {
           return crudErrorHandler(500,'Failed to retrieve all schools',err,res)
       }
} 

export const getSingleSchool = async (req:Request, res:Response):Promise<void> => {
    try {
        console.log(req.body)
        const {id} = req.params 

        const school = await School.findById(id).lean()
        if(!school) {
            return crudErrorHandler(404,'School retrieval failed',{err:'School not found in databse'},res)
        }

        return crudResultHandler(200,'School retrieved successfuly',school,res)

    }catch(err: Error | unknown) {
        return crudErrorHandler(500,'School retrieval failed',err,res)
    }
}


export const addSchool = async (req:Request, res:Response):Promise<void> => {
    try {
        validateRequestBody('creation','school',req)

        req.body.logo = req.file?.filename

        const addedSchool = await School.create(req.body)

        return crudResultHandler(200,'School added successfuly',addedSchool,res)

    }catch(err: Error | unknown) {
        fileDeleteHandler('images', req?.file?.filename)
        return crudErrorHandler(500,'School addition failed',err,res)
    }
}

export const deleteSchool = async (req:Request, res:Response):Promise<void> => {
    try {
        const {id} = req.params

        const schoolToDelete = await School.findById(id)
        if(!schoolToDelete) {
            return crudErrorHandler(404,'School deletion failed',{error:'School not found for deletion'},res)
        }

        const deletedSchool = await School.findByIdAndDelete(id).lean()
        fileDeleteHandler('images',schoolToDelete.logo)

        return crudResultHandler(200,'School deleted successfuly',deletedSchool,res)

    }catch(err: Error | unknown) {
        return crudErrorHandler(500,'School deletion failed',err,res)
    }
}


export const updateSchool = async (req:Request, res:Response):Promise<void> => {
    try {
        validateRequestBody('update','school',req)
        const {id} = req.params

        const schoolToUpdate = await School.findById(id)
        if(!schoolToUpdate) {
            fileDeleteHandler('images',req.file?.filename)
            return crudErrorHandler(404,'School Update failed',{error:'School not found for Update'},res)
        }
        
        if(req.file) {
            req.body.logo = req.file?.filename
            console.log(req.body.logo)
        }

        const updatedSchool = await School.findByIdAndUpdate(id,req.body,{new:true})
        fileDeleteHandler('images',schoolToUpdate.logo)
        return crudResultHandler(201,'School updated successfuly',updatedSchool,res)

    }catch(err: Error | unknown) {
        fileDeleteHandler('images',req.file?.filename)
        return crudErrorHandler(500,'School update failed',err,res)
    }
}