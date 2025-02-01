import { Response } from "express";

type ValidErrorStatuses = 404 | 400 | 500

export const crudErrorHandler = (status:ValidErrorStatuses,errMsg:string,err:unknown,res:Response):void => {
    if(err instanceof Error) {
        res.status(status).json({
            error:errMsg,
            details: err.message,
            errObject: err
        })
        return
    }
    res.status(status).json({
        error:'Unknown error occured',
        details:errMsg,
        errorObject:err
    })
    return 
}

type ValidSucessStatuses = 200 | 201

export const crudResultHandler = <T>(status:ValidSucessStatuses,message:string, result:T, res:Response):void => {
    res.status(status).json({
        message,
        result
    })   
}