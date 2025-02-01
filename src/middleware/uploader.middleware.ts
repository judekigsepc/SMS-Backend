import { Request } from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const imageUploader = () => {
    const storage = multer.diskStorage({
        destination:(req:Request, file: Express.Multer.File, cb:((error:Error | null, value:string) => void)) => {
            const uploadPath = path.join(__dirname,'../public/images')

            cb(null, uploadPath)
        },
    
        filename:(req:Request, file:Express.Multer.File, cb:(error: Error | null, value:string) => void) => {
            const uniqueFileSuffix = Date.now() + '-' + file.originalname

            cb(null, uniqueFileSuffix)
        }
    })

    return multer({storage})
}


