import { Router } from 'express';
import { makeTransaction, returnTransactions } from '../controllers/transactions.controller.js';

const transactionsRouter = Router();

transactionsRouter.post("/nova-transacao/:tipo", makeTransaction);
transactionsRouter.get("/home", returnTransactions);

export default transactionsRouter;