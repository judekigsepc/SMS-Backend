import { Request, Response } from "express";
import { validateRequestBody } from "../../utils/validation/validate.js";
import { crudErrorHandler, crudResultHandler } from "../../utils/handler.utils.js";
import Stream from "../../models/academics/streams.model.js";

export const createStream = async (req:Request, res: Response) => {
    try {
        validateRequestBody('creation','stream',req)

        const existingStream = await Stream.findOne({name: req.body.name, forSchool: req.user.forSchool})
        if (existingStream) {
            throw new Error('Stream with the same name already exits')
        }

        const createdStream = await Stream.create({...req.body, forSchool: req.user.forSchool})

        return crudResultHandler(201,'Stream created successfuly',createdStream, res)

    }catch(err: unknown) {
        return crudErrorHandler(500,'Stream creation failed',err,res)
    }
}

export const updateStream = async (req:Request, res:Response) => {
    try {
        validateRequestBody('update','stream',req)

        const {id} = req.params

        const streamToUpdate = await Stream.findOne({_id: id, forSchool: req.user.forSchool})

        if(!streamToUpdate) {
            throw new Error('Stream requested to update not found')
        }

        const updatedStream = await Stream.findByIdAndUpdate(id, req.body,{new:true})

        return crudResultHandler(200,'Stream updated succeessfuly', updatedStream ,res)
    }catch(err: unknown) {
        return crudErrorHandler(500,'Stream update failed',err,res)
    }
}

export const deleteStream = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const streamToDelete = await Stream.findOne({_id: id, forSchool: req.user.forSchool})

        if(!streamToDelete) {
            throw new Error('Stream requested to delete not found')
        }

        const deletedStream = await Stream.findByIdAndDelete(id)

        return crudResultHandler(200,'Stream deleted succeessfuly', deletedStream ,res)
   
    }catch(err: unknown) {
        return crudErrorHandler(500,'Stream deletion failed',err,res)
    }
}

export const getAllStreams = async (req:Request, res: Response) => {
    try {
        const allStreams = await Stream.find({forSchool: req.user.forSchool})

        if(allStreams.length < 1) {
            return crudErrorHandler(404,'No streams found',{err:'No streams found in database'},res)
        }

        return crudResultHandler(200,'Retrieved all streams successfuly', allStreams ,res)

    }catch(err: unknown) {
        return crudErrorHandler(500,'Failed to retrieve all streams',err,res)
    }
}

export const getSingleStream = async (req:Request, res: Response) => {
    try {
        const {id} = req.params

        const stream = await Stream.findOne({_id: id, forSchool: req.user.forSchool})

        if(!stream) {
            return crudErrorHandler(404,'Requested stream not found',{err:'Requested stream not found in database'},res)
        }
 
        return crudResultHandler(200,'Stream retrieved successfuly', stream ,res)

    }catch(err: unknown) {
        return crudErrorHandler(500,'Stream retrieval failed',err,res)
    }
}
