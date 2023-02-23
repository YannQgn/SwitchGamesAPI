const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../../ressources/json/config.json");

exports.authenticateToken = (req, res, next) => {
    const token =
        req.headers["authorization"] && req.headers["authorization"].split(" ")[1]; // 'Bearer {token}'

    if (!token) {
        res.sendStatus(401);
    }
    jwt.verify(token, JWT_SECRET.jwtSecret, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(401).send({ error: "Your rights are revoked." });
        }
        req.user = user;
        next();
    });
};