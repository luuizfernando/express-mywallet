import dayjs from "dayjs"
import { db } from "../database/database.connection.js"
import { ObjectId } from "mongodb"

export async function createTransaction(req, res) {
    const { value, description, type } = req.body
    const { userId } = res.locals.session

    try {
        const transaction = { value: Number(value), description, type, userId, date: dayjs().valueOf() }
        await db.collection("transactions").insertOne(transaction)
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getTransactions(req, res) {
    const { userId } = res.locals.session

    try {
        const transactions = await db
            .collection("transactions")
            .find({ userId })
            .sort({ date: -1 })
            .toArray()

        res.send(transactions)
    } catch (err) {
        res.status(500).send(err.message)
    }
}