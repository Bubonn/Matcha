"use strict";
exports.__esModule = true;
exports.getConnection = exports.createConnection = void 0;
var mysql2_1 = require("mysql2");
var connection;
exports.createConnection = function () {
    connection = mysql2_1["default"].createConnection({
        // host: '127.0.0.1',
        host: 'mon_mysql',
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    connection.connect(function (err) {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
        }
        else {
            console.log('Connecté à la base de données MySQL !');
        }
    });
};
exports.getConnection = function () {
    if (!connection) {
        throw new Error('La connexion à la base de données n\'a pas encore été établie.');
    }
    return connection;
};
