import { Router } from "express";
import { createClass } from "../../controllers/academics/class.controller.js";
import { authenticateUser, checkPermissions } from "../../middleware/auth.middleware.js";

const classRouter = Router()

classRouter.post('/',authenticateUser, checkPermissions('create_class') ,createClass)

export default classRouter