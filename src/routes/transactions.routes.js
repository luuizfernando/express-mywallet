import { Router } from 'express';
import { makeTransaction, returnTransactions } from '../controllers/transactions.controller.js';
import { authValidation } from '../middlewares/auth.middleware.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { transactionSchema } from '../schemas/transactions.schema.js';

const transactionsRouter = Router();

transactionsRouter.use(authValidation);
transactionsRouter.post("/transactions", validateSchema(transactionSchema), makeTransaction);
transactionsRouter.get("/transactions", returnTransactions);

export default transactionsRouter;