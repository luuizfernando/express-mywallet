import { Router } from 'express';
import { makeTransaction, returnTransactions } from '../controllers/transactions.controller.js';

const transactionsRouter = Router();

transactionsRouter.post("/transactions/:type", makeTransaction);
transactionsRouter.get("/transactions", returnTransactions);

export default transactionsRouter;