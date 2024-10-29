import { Router } from 'express';
import { signIn, signUp } from '../controllers/users.controller.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { userSchema } from '../schemas/users.schema.js';

const usersRouter = Router();

usersRouter.post("/sign-up", validateSchema(userSchema), signUp);
usersRouter.post("/sign-in", signIn);

export default usersRouter;