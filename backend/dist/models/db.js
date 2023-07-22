"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = exports.createConnection = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
let connection;
const createConnection = () => {
    connection = mysql2_1.default.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'rootpass',
        database: 'flirtopia',
    });
    connection.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
        }
        else {
            console.log('Connecté à la base de données MySQL !');
        }
    });
};
exports.createConnection = createConnection;
const getConnection = () => {
    if (!connection) {
        throw new Error('La connexion à la base de données n\'a pas encore été établie.');
    }
    return connection;
};
exports.getConnection = getConnection;
