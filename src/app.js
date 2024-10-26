
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { signIn, signUp } from './controllers/users.controller.js';
import { makeTransaction, returnTransactions } from './controllers/transactions.controller.js';

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

// EndPoints
app.post("/sign-up", signUp);

app.post("/sign-in", signIn);

app.post("/nova-transacao/:tipo", makeTransaction);

app.get("/home", returnTransactions);

app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}.`));