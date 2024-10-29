import { Router } from 'express';
import { logout, signIn, signUp } from '../controllers/users.controller.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { loginSchema, userSchema } from '../schemas/users.schema.js';

const usersRouter = Router();

usersRouter.post("/sign-up", validateSchema(userSchema), signUp);
usersRouter.post("/sign-in", validateSchema(loginSchema),signIn);
usersRouter.post("/sign-out", logout)

export default usersRouter;