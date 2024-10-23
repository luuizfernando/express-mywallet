import bcrypt from 'bcrypt';
import { db } from '../app.js';
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    const validation = userSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const user = await db.collection("usuarios").findOne({ email });
        if (user) return res.status(409).send("E-mail já cadastrado");

        const hash = bcrypt.hashSync(password, 10);

        await db.collection("usuarios").insertOne({ name, email, password: hash });
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function signIn(req, res) {
    
};