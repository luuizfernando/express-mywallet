import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import joi from 'joi';
import { MongoClient, ObjectId } from 'mongodb';
import { v4 as uuid } from 'uuid';

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

// DB Config
const mongoClient = new MongoClient(process.env.DATABASE_URL);
try {
    await mongoClient.connect();
    console.log("MongoDB conectado!");
} catch (err) {
    console.log(err.message);
}
export const db = mongoClient.db();

// Schemas
const userSchema = joi.object({
    userName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(3)
});

const transactionSchema = joi.object({
    value: joi.number().precision(2).positive().required(),
    description: joi.string()
});

// EndPoints
app.post("/sign-up", async (req, res) => {
    const { userName, email, password } = req.body;

    const validation = userSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const user = await db.collection("usuarios").findOne({ email });
        if (user) return res.status(409).send("E-mail já cadastrado");

        const hash = bcrypt.hashSync(password, 10);

        await db.collection("usuarios").insertOne({ userName, email, password: hash });
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post("/sign-in", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.collection("usuarios").findOne({ email });
        if (!user) return res.status(404).send("Usuário não encontrado");

        const correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) return res.status(401).send("Senha incorreta");

        const token = uuid();
        await db.collection("sections").insertOne({ token, userId: user._id });

        const { userName } = user;
        res.send({ token, userName });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post("/nova-transacao/:tipo", async (req, res) => {
    const { type } = req.params;
    const { value, description } = req.body;
    const { authorization } = req.headers;

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

        const transaction = await db.collection("transactions").insertOne({ value, description, type });
        if (transaction) return res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}.`));