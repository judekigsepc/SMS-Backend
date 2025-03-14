import { Router } from "express";
import { authenticateUser, checkPermissions } from "../../middleware/auth.middleware.js";
import { createTerm, deleteTerm, getAllTerms, getSingleTerm, updateTerm } from "../../controllers/academics/term.controller.js";

const termRouter = Router()

termRouter.post('/', authenticateUser, checkPermissions('create_term'), createTerm)
termRouter.put('/:id', authenticateUser, checkPermissions('edit_term'), updateTerm)
termRouter.delete('/:id', authenticateUser, checkPermissions('delete_term'), deleteTerm)
termRouter.get('/', authenticateUser, checkPermissions('view_terms'), getAllTerms)
termRouter.get('/:id', authenticateUser, checkPermissions('view_terms'), getSingleTerm)

export default termRouter
