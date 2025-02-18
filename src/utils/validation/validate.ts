import z,{ ZodError, ZodSchema } from "zod";
import { Request } from "express";

import { iAdminSchema, iClassSchema, 
    iConfigSchema, 
    iLearnerSchema, 
    iParentSchema, 
    iSchoolSchema, 
    iStreamSchema, 
    iSubjectSchema, 
    iTeacherSchema, 
    iTermSchema, 
    iUserSchema, 
    adminLoginSchema,
    schoolAdminSchema,
    userLoginSchema} from "./schemas.js"


export const validationSchemaMap= {
    'class': iClassSchema,
    'config': iConfigSchema,
    'learner': iLearnerSchema,
    'parent': iParentSchema,
    'school': iSchoolSchema,
    'stream': iStreamSchema,
    'subject': iSubjectSchema,
    'teacher': iTeacherSchema,
    'term': iTermSchema,
    'user': iUserSchema,
    'user-login': userLoginSchema,
    'admin': iAdminSchema,
    'admin-login': adminLoginSchema,
    'school-admin': schoolAdminSchema
  };

export type ValidationTypes = keyof typeof validationSchemaMap

export const validateRequestBody = (validationType:'creation'|'update',whatToValidate:ValidationTypes, req:Request) => {
    try {
        let schema:ZodSchema
        
        if(validationType === 'creation') {

             validationSchemaMap[whatToValidate].parse(req.body)
            return
        }else {
            schema = validationSchemaMap[whatToValidate].partial().optional()
            schema.parse(req.body)
            return
        }
    }catch(err: unknown) {

        if (err instanceof ZodError) {
            const message = err.errors
            .map(e => `${e.path.join(".")}: ${e.message}`) // Include field name
            .join(", ");
        
        throw new Error(`Validation failed: ${message}`);
        }

        throw new Error(`Unknown error occured during ${whatToValidate} validation. Please check your values`)
    }
}

export  const checkEnvironmentVairables = (varableList: string []) => {

        varableList.forEach((envVariableName) => {
            const envVariable = process.env[envVariableName]
            if(!envVariable) {
                throw new Error(`${envVariableName} environment variable is missing `)
            } 
        })
}  
