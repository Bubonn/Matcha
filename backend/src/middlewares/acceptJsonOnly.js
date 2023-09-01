"use strict";
exports.__esModule = true;
var acceptJsonOnly = function (req, res, next) {
    if (req.is('json')) {
        next();
    }
    else {
        res.status(400).json({ error: 'Requête accepte uniquement le format JSON.' });
    }
};
exports["default"] = acceptJsonOnly;
