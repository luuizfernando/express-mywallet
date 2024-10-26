import bcrypt from 'bcrypt';
import cors from 'cors';
import dayjs from 'dayjs';
import dotenv from 'dotenv';
import express from 'express';
import joi from 'joi';
import { signIn, signUp } from './controllers/users.controller.js';

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

// Schemas

const transactionSchema = joi.object({
    value: joi.number().precision(2).positive().required(),
    description: joi.string()
});

// EndPoints
app.post("/sign-up", signUp);

app.post("/sign-in", signIn);

app.post("/nova-transacao/:tipo", async (req, res) => {
    const { tipo } = req.params;
    const { value, description } = req.body;
    const { authorization } = req.headers;

    const today = dayjs().format('DD-MM-YYYY');

    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    try {
        const session = await db.collection("sections").findOne({ token });
        if (!session) return res.sendStatus(401);

        const validation = transactionSchema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            const errors = validation.error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }

        const transaction = await db.collection("transactions").insertOne({ today, value, description, tipo });
        if (transaction) return res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get("/home", async (req, res) => {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    try {
        const sessao = await db.collection("sections").findOne({ token });
        if (!sessao) return res.sendStatus(401);

        const transactions = await db.collection("transactions").find().toArray();
        res.send(transactions);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}.`));