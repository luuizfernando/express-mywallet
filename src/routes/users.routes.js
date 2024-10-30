import { Router } from 'express';
import { logout, signIn, signUp } from '../controllers/auth.controllers.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { loginSchema, userSchema } from '../schemas/users.schema.js';
import { authValidation } from '../middlewares/auth.middleware.js';

const usersRouter = Router();

usersRouter.post("/sign-up", validateSchema(userSchema), signUp);
usersRouter.post("/sign-in", validateSchema(loginSchema),signIn);
usersRouter.post("/sign-out", authValidation, logout)

export default usersRouter;