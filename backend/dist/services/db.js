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
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMessage = void 0;
const connectionDb_1 = require("./connectionDb");
const insertMessage = (conversation_id, message_content, recipient_id, sender_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = (0, connectionDb_1.getConnection)();
        const query = 'INSERT INTO privateMessages (conversation_id, sender_id, recipient_id, message_content, timestamp) VALUES (?, ?, ?, ?, NOW())';
        const relation = yield new Promise((resolve, reject) => {
            connection.query(query, [conversation_id, sender_id, recipient_id, message_content], (err, results) => {
                if (err) {
                    reject(new Error('Erreur lors de l\'exécution de la requête'));
                }
                else {
                    resolve(results);
                }
            });
        });
    }
    catch (error) {
        console.log('Erreur lors de l\'exécution de la requête');
    }
});
exports.insertMessage = insertMessage;
