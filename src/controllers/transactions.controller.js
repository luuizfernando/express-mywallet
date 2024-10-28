import joi from 'joi';
import dayjs from 'dayjs';
import { db } from '../database/database.connection.js';

const transactionSchema = joi.object({
    value: joi.number().precision(2).positive().required(),
    description: joi.string()
});

export async function makeTransaction(req, res) {
    const { type } = req.params;
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

        const transaction = await db.collection("transactions").insertOne({ today, value, description, type });
        if (transaction) return res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function returnTransactions(req, res) {
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
};