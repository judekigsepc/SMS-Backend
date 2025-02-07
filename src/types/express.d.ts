import { Express } from "express"

declare global {
    namespace Express {
        export interface Request {
            user?: any 
        }
    }
}