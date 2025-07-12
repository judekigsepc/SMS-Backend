import { Response } from "express";
import fs from 'fs'
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url))


type ValidErrorStatuses = 404 | 400 | 500 | 403 | 401 

// Error handler
export const crudErrorHandler: (status: ValidErrorStatuses, errMsg: string, err: unknown, res: Response) => void = (status, errMsg, err, res) => {
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

//Result sender or handler
export const crudResultHandler = <T>(status:ValidSucessStatuses,message:string, result:T, res:Response):void => {
    res.status(status).json({
        message,
        result
    })   
}

export const fileDeleteHandler = (fileType:'images'|'documents', fileName:string | undefined):void => {
   try {
    if (fileName) {
        const filePath = path.join(__dirname,`../public/${fileType}/${fileName}`)

        fs.unlink(filePath, () => {
            console.log(`${fileName} deleted`)
        })
    }
      console.log('file name not specified')
   }catch(err) {
        console.log(err)
        return
   }
   
}
