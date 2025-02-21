import { Request, Response } from "express";
import { validateRequestBody } from "../../utils/validation/validate.js";
import { crudErrorHandler, crudResultHandler } from "../../utils/handler.utils.js";
import Subject from "../../models/academics/subject.model.js";

export const createSubject = async (req:Request, res: Response) => {
    try {
        validateRequestBody('creation','subject',req)

        const createdSubject = await Subject.create({...req.body, forSchool: req.user.forSchool})

        return crudResultHandler(201,'Subject created successfuly',createdSubject, res)

    }catch(err: unknown) {
        return crudErrorHandler(500,'Subject creation failed',err,res)
    }
}
