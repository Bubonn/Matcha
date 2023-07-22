"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const acceptJsonOnly = (req, res, next) => {
    console.log('OK');
    if (req.is('json')) {
        next();
    }
    else {
        res.status(400).json({ error: 'Requête accepte uniquement le format JSON.' });
    }
};
exports.default = acceptJsonOnly;
