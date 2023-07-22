"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
app.post('/signup', acceptJsonOnly, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, firstName, lastName, password } = req.body;
    if (!email || !username || !firstName || !lastName || !password) {
        return res.status(401).json({ error: 'Missing required parameters.' });
    }
    const checkUserQuery = 'SELECT * FROM user WHERE username = ?';
    const checkUserValues = [username];
    try {
        const checkUserResult = yield new Promise((resolve, reject) => {
            connection.query(checkUserQuery, checkUserValues, (checkUserErr, checkUserResults) => {
                if (checkUserErr) {
                    reject(new Error('Une erreur est survenue lors de la vérification du nom d\'utilisateur.'));
                }
                else {
                    resolve(checkUserResults);
                }
            });
        });
        if (checkUserResult.length > 0) {
            // throw new Error('Username already taken.');
            return res.status(409).json({ error: 'Username already taken.' });
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
    const hashedPassword = yield argon2.hash(password);
    const sql = 'INSERT INTO user (email, username, firstName, lastName, password) VALUES (?, ?, ?, ?, ?);';
    const values = [email, username, firstName, lastName, hashedPassword];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', err);
            // return res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout de l\'utilisateur.' });
        }
        console.log('Nouvel utilisateur ajouté avec l\'ID :', result.insertId);
        return res.json({ success: true });
    });
}));
