import { Router } from "express";
import { authenticateUser, checkPermissions } from "../../middleware/auth.middleware.js";
import { createSubject } from "../../controllers/academics/subject.controller.js";

const subjectRouter = Router()

subjectRouter.post('/',authenticateUser, checkPermissions('create_subject') ,createSubject)

export default subjectRouter