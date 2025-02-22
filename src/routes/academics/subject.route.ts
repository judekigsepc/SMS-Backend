import { Router } from "express";
import { authenticateUser, checkPermissions } from "../../middleware/auth.middleware.js";
import { createSubject, deleteSubject, getAllSubjects, getSingleSubject, updateSubject } from "../../controllers/academics/subject.controller.js";

const subjectRouter = Router()

subjectRouter.post('/',authenticateUser, checkPermissions('create_subject') ,createSubject)
subjectRouter.put('/:id',authenticateUser, checkPermissions('edit_subject'), updateSubject)
subjectRouter.delete('/:id', authenticateUser, checkPermissions('delete_subject'), deleteSubject)
subjectRouter.get('/', authenticateUser, checkPermissions('view_subjects'), getAllSubjects)
subjectRouter.get('/:id', authenticateUser, checkPermissions('view_subjects'), getSingleSubject)

export default subjectRouter