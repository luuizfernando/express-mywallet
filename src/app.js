import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import joi from 'joi';

app.use(cors());
app.use(express.json());
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
try {
    await mongoClient.connect();
    console.log("MongoDB conectado!");
} catch (err) {
    console.log(err.message);
}
const db = mongoClient.db();

app.post("/cadastro", async (req, res) => {

});

app.post("/", async (req, res) => {

});

app.post("/nova-transacao/:tipo", (req, res) => {

});

app.get("/home", async (req, res) => {

});