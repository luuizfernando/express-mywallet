import dayjs from 'dayjs';
import { db } from '../database/database.connection.js';

export async function makeTransaction(req, res) {
    const { value, description, type } = req.body;
    const userId = res.locals.session.userId;
    const today = dayjs().format('DD-MM-YYYY');

    try {
        const transaction = await db.collection("transactions").insertOne({ today, userId, value: Number(value), description, type });
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

        const transactions = await db.collection("transactions").find({ userId }).sort({ date: -1 }).toArray();
        res.send(transactions);
    } catch (err) {
        res.status(500).send(err.message);
    }
};