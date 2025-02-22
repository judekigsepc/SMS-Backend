import { Router } from "express";
import { createClass, deleteClass, getAllClasses, getSingleClass, updateClass } from "../../controllers/academics/class.controller.js";
import { authenticateUser, checkPermissions } from "../../middleware/auth.middleware.js";

const classRouter = Router()

classRouter.post('/',authenticateUser, checkPermissions('create_class') ,createClass)
classRouter.put('/:id', authenticateUser, checkPermissions('edit_class'), updateClass)
classRouter.get('/', authenticateUser, checkPermissions('view_classes'), getAllClasses)
classRouter.get('/:id', authenticateUser, checkPermissions('view_classes'), getSingleClass)
classRouter.delete('/:id', authenticateUser, checkPermissions('delete_class'), deleteClass)

export default classRouter