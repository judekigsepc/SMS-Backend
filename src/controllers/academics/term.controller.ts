import Term from "../../models/academics/term.model.js"
import { validateRequestBody } from "../../utils/validation/validate.js"
import { crudErrorHandler, crudResultHandler } from "../../utils/handler.utils.js"
import { Request, Response } from "express"

export const createTerm = async (req:Request, res: Response) => {
    try {
        validateRequestBody('creation','term',req)

        const existingTerm = await Term.findOne({name: req.body.name, forSchool: req.user.forSchool})
        if (existingTerm) {
            throw new Error('Term with the same name already exits')
        }

        const createdTerm = await Term.create({...req.body, forSchool: req.user.forSchool})

        return crudResultHandler(201,'Term created successfuly',createdTerm, res)

    }catch(err: unknown) {
        return crudErrorHandler(500,'Term creation failed',err,res)
    }
}

export const updateTerm = async (req:Request, res:Response) => {
    try {
        validateRequestBody('update','term',req)

        const {id} = req.params

        const TermToUpdate = await Term.findOne({_id: id, forSchool: req.user.forSchool})

        if(!TermToUpdate) {
            throw new Error('Term requested for update not found')
        }

        const updatedTerm = await Term.findByIdAndUpdate(id, req.body,{new:true})

        return crudResultHandler(200,'Term updated succeessfuly', updatedTerm ,res)
    }catch(err: unknown) {
        return crudErrorHandler(500,'Term update failed',err,res)
    }
}


export const deleteTerm = async (req: Request, res: Response) => {
    try {
const {id} = req.params

const TermToDelete = await Term.findOne({_id: id, forSchool: req.user.forSchool})

if(!TermToDelete) {
    throw new Error('Term requested for deletion not found')

}
const deletedTerm = await Term.findByIdAndDelete(id)

return crudResultHandler(200,'Term delete succeessfuly', deletedTerm ,res)
   
}
catch(err: unknown) {
        return crudErrorHandler(500,'Term deletion failed',err,res)
    }
}

// FUNCTION TO GET ALL TermS
export const getAllTerms = async (req:Request, res: Response) => {
    try {

        const allTerms = await Term.find({forSchool: req.user.forSchool})

        if(allTerms.length < 1) {
            return crudErrorHandler(404,'No Terms found',{err:'No Terms found in database'},res)
        }

        return crudResultHandler(200,'Retrieved all Terms successfuly', allTerms ,res)

    }catch(err: unknown) {
        return crudErrorHandler(500,'Failed to retrieve all Terms',err,res)
    }
}

export const getSingleTerm = async (req:Request, res: Response) => {
    try {
        const {id} = req.params

        const term = await Term.findOne({_id: id, forSchool: req.user.forSchool})

        if(!term) {
            return crudErrorHandler(404,'Requested Term not found',{err:'Requested Term not found in database'},res)
        }
 
        return crudResultHandler(200,'Term retrieved successfuly', term ,res)

    }catch(err: unknown) {
        return crudErrorHandler(500,'Term retrieval failed',err,res)
    }
}

