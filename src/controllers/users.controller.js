import bcrypt from 'bcrypt';
import { db } from '../database/database.connection.js';
import { v4 as uuid } from 'uuid';
import { userSchema } from '../schemas/users.schema.js';
userSchema

export async function signUp(req, res) {
    const { userName, email, password } = req.body;

    try {
        const user = await db.collection("usuarios").findOne({ email });
        if (user) return res.status(409).send("E-mail já cadastrado");

        const hash = bcrypt.hashSync(password, 10);

        await db.collection("usuarios").insertOne({ userName, email, password: hash });
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function signIn(req, res) {
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
};

export async function logout(req, res) {
    const token = res.locals.session.token;
    try {
        await db.collection("sections").deleteOne({ token });
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
};