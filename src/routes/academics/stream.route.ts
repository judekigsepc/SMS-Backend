import { Router } from "express";
import { authenticateUser, checkPermissions } from "../../middleware/auth.middleware.js";
import { createStream, deleteStream, getAllStreams, getSingleStream, updateStream } from "../../controllers/academics/stream.controller.js";

const streamRouter = Router()

streamRouter.post('/', authenticateUser, checkPermissions('create_stream'), createStream)
streamRouter.put('/:id', authenticateUser, checkPermissions('edit_stream'), updateStream)
streamRouter.delete('/:id', authenticateUser, checkPermissions('delete_stream'), deleteStream)
streamRouter.get('/', authenticateUser, checkPermissions('view_streams'), getAllStreams)
streamRouter.get('/:id', authenticateUser, checkPermissions('view_streams'), getSingleStream)

export default streamRouter
