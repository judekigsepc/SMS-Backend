import { Request, Response } from "express";
import { validateRequestBody } from "../../utils/validation/validate.js";
import { crudErrorHandler } from "../../utils/handler.utils.js";
import { crudResultHandler } from "../../utils/handler.utils.js";
import Class from "../../models/academics/class.model.js";

export const createClass = async (req:Request, res: Response) => {
    try {
        validateRequestBody('creation','class',req)

        const existingClass = await Class.findOne({name: req.body.name, forSchool: req.user.forSchool})
        if (existingClass) {
            throw new Error('Class with the same name already exits')
        }

        const createdClass = await Class.create({...req.body, forSchool: req.user.forSchool})

        return crudResultHandler(201,'Class created successfuly',createdClass, res)

    }catch(err: unknown) {
        return crudErrorHandler(500,'Class creation failed',err,res)
    }
} 

export const updateClass = async (req:Request, res:Response) => {
    try {
        validateRequestBody('update','class',req)

        const {id} = req.params

        const classToUpdate = await Class.findOne({_id: id, forSchool: req.user.forSchool})

        if(!classToUpdate) {
            throw new Error('Class requested to update not found')
        }

        const updatedClass = await Class.findByIdAndUpdate(id, req.body,{new:true})

        return crudResultHandler(200,'Class updated succeessfuly', updatedClass,res)
    }catch(err: unknown) {
        return crudErrorHandler(500,'Class update failed',err,res)
    }
}

export const deleteClass = async (req: Request, res: Response) => {
    try {
const {id} = req.params

const classToDelete = await Class.findOne({_id: id, forSchool: req.user.forSchool})

if(!classToDelete) {
    throw new Error('Class requested for deletion not found not found')

}
const deletedClass = await Class.findByIdAndDelete(id)

return crudResultHandler(200,'Class deleted succeessfuly', deletedClass ,res)
   
}
catch(err: unknown) {
        return crudErrorHandler(500,'Class deletion failed',err,res)
    }
}


export const getAllClasses = async (req:Request, res: Response) => {
    try {

        const allClasses= await Class.find({forSchool: req.user.forSchool})
                                .populate('subjects', 'name')

        if(allClasses.length < 1) {
            return crudErrorHandler(404,'No Classes found',{err:'No Classesfound in database'},res)
        }

        return crudResultHandler(200,'Retrieved all Classes successfuly', allClasses,res)

    }catch(err: unknown) {
        return crudErrorHandler(500,'Failed to retrieve all classes',err,res)
    }
}

export const getSingleClass = async (req:Request, res: Response) => {
    try {
        const {id} = req.params

        const oneClass = await Class.findOne({_id: id, forSchool: req.user.forSchool})
                               .populate('subjects', 'name')
        if(!oneClass) {
            return crudErrorHandler(404,'Requested class not found',{err:'Requested class not found in database'},res)
        }
 
        return crudResultHandler(200,'Class retrieved successfuly', oneClass ,res)

    }catch(err: unknown) {
        return crudErrorHandler(500,'Class retrieval failed',err,res)
    }
}

