export async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sensStatus(401);

    try {
        const session = await db.collection("sections").findOne({ token });
        if (!session) return res.status(401).send("Sessão não encontrada");

        res.locals.session = session;

        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
};