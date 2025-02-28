import { Request, Response } from "express";
import { validateRequestBody } from "../../utils/validation/validate.js";
import { crudErrorHandler, crudResultHandler } from "../../utils/handler.utils.js";
import Subject from "../../models/academics/subject.model.js";

export const createSubject = async (req:Request, res: Response) => {
    try {
        validateRequestBody('creation','subject',req)

        const existingSubject = await Subject.findOne({name: req.body.name, forSchool: req.user.forSchool})
        if (existingSubject) {
            throw new Error('Subject with the same name already exits')
        }

        const createdSubject = await Subject.create({...req.body, forSchool: req.user.forSchool})

        return crudResultHandler(201,'Subject created successfuly',createdSubject, res)

    }catch(err: unknown) {
        return crudErrorHandler(500,'Subject creation failed',err,res)
    }
}

export const updateSubject = async (req:Request, res:Response) => {
    try {
        validateRequestBody('update','subject',req)

        const {id} = req.params

        const subjectToUpdate = await Subject.findOne({_id: id, forSchool: req.user.forSchool})

        if(!subjectToUpdate) {
            throw new Error('Subject requested to update not found')
        }

        const updatedSubject = await Subject.findByIdAndUpdate(id, req.body,{new:true})

        return crudResultHandler(200,'Subject updated succeessfuly', updatedSubject ,res)
    }catch(err: unknown) {
        return crudErrorHandler(500,'Subject update failed',err,res)
    }
}


export const deleteSubject = async (req: Request, res: Response) => {
    try {
const {id} = req.params

const subjectToDelete = await Subject.findOne({_id: id, forSchool: req.user.forSchool})

if(!subjectToDelete) {
    throw new Error('Subject requested to update not found')

}
const deletedSubject = await Subject.findByIdAndDelete(id)

return crudResultHandler(200,'Subject delete succeessfuly', deletedSubject ,res)
   
}
catch(err: unknown) {
        return crudErrorHandler(500,'Subject deletion failed',err,res)
    }
}

// FUNCTION TO GET ALL SUBJECTS
export const getAllSubjects = async (req:Request, res: Response) => {
    try {

        const allSubjects = await Subject.find({forSchool: req.user.forSchool})

        if(allSubjects.length < 1) {
            return crudErrorHandler(404,'No subjects found',{err:'No subjects found in database'},res)
        }

        return crudResultHandler(200,'Retrieved all subjects successfuly', allSubjects ,res)

    }catch(err: unknown) {
        return crudErrorHandler(500,'Failed to retrieve all subjects',err,res)
    }
}



export const getSingleSubject = async (req:Request, res: Response) => {
    try {
        const {id} = req.params

        const subject = await Subject.findOne({_id: id, forSchool: req.user.forSchool})

        if(!subject) {
            return crudErrorHandler(404,'Requested subject not found',{err:'Requested subject not found in database'},res)
        }
 
        return crudResultHandler(200,'Subject retrieved successfuly', subject ,res)

    }catch(err: unknown) {
        return crudErrorHandler(500,'Subject retrieval failed',err,res)
    }
}

