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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var connectionDb_1 = require("./services/connectionDb");
var token_1 = require("./utils/token");
var socket_io_1 = require("socket.io");
var express_1 = require("express");
var cors_1 = require("cors");
var login_1 = require("./routes/login");
var user_1 = require("./routes/user");
var uploads_1 = require("./routes/uploads");
var dotenv_1 = require("dotenv");
var http_1 = require("http");
var db_1 = require("./services/db");
var userUtils_1 = require("./utils/userUtils");
dotenv_1["default"].config();
var app = express_1["default"]();
var port = 3000;
var server = http_1["default"].createServer(app);
app.use(cors_1["default"]());
app.use(express_1["default"].json());
connectionDb_1.createConnection();
app.use('/login', login_1["default"]);
app.use(token_1.authenticateToken);
app.use('/users', user_1["default"]);
app.use('/uploads', uploads_1["default"]);
var io = new socket_io_1.Server(server, {
    cors: {
        // origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});
var connectedSockets = {};
io.on('connection', function (socket) {
    socket.on('userConnect', function (data) {
        var userId = data.userId;
        console.log("User " + userId + " connected via Socket.io");
        connectedSockets[userId] = socket;
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.userConnected(userId)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    });
    socket.on('userDisconnect', function (data) {
        var userId = data.userId;
        console.log("User " + userId + " DISconnected via Socket.io");
        delete connectedSockets[userId];
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.userDisonnected(userId)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    });
    socket.on('disconnect', function () {
        var disconnectedUserId = Object.keys(connectedSockets).find(function (userId) { return connectedSockets[userId] === socket; });
        if (disconnectedUserId) {
            console.log("User " + disconnectedUserId + " disconnected");
            delete connectedSockets[disconnectedUserId];
            (function () { return __awaiter(void 0, void 0, void 0, function () {
                var error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, db_1.userDisonnected(Number(disconnectedUserId))];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            console.log(error_3);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })();
        }
        else {
            console.log('A user disconnected');
        }
    });
    socket.on('message', function (data) {
        var conversation_id = data.conversation_id;
        var message_content = data.message_content;
        var recipient_id = data.recipient_id;
        var sender_id = data.sender_id;
        var timestamp = data.timestamp;
        socket.emit('messageFromServer', { conversation_id: conversation_id, message_content: message_content, recipient_id: recipient_id, sender_id: sender_id, timestamp: timestamp });
        socket.emit('messageFromServerBis', { conversation_id: conversation_id, message_content: message_content, recipient_id: recipient_id, sender_id: sender_id, timestamp: timestamp });
        var userSocket = connectedSockets[recipient_id];
        if (userSocket) {
            userSocket.emit('messageFromServer', { conversation_id: conversation_id, message_content: message_content, recipient_id: recipient_id, sender_id: sender_id, timestamp: timestamp });
            userSocket.emit('messageFromServerBis', { conversation_id: conversation_id, message_content: message_content, recipient_id: recipient_id, sender_id: sender_id, timestamp: timestamp });
        }
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, db_1.insertMessage(conversation_id, message_content, recipient_id, sender_id)];
                    case 1:
                        _a.sent();
                        if (!!userSocket) return [3 /*break*/, 3];
                        return [4 /*yield*/, db_1.addNotifMessage(recipient_id, conversation_id, message_content)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); })();
    });
    socket.on('like', function (data) {
        var sender_id = data.sender_id;
        var recipient_id = data.recipient_id;
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var userSocket, senderUserSocket, relation, notificationType, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 12, , 13]);
                        return [4 /*yield*/, db_1.insertLike(sender_id, recipient_id)];
                    case 1:
                        _a.sent();
                        userSocket = connectedSockets[recipient_id];
                        senderUserSocket = connectedSockets[sender_id];
                        return [4 /*yield*/, db_1.getRelaion(sender_id, recipient_id)];
                    case 2:
                        relation = _a.sent();
                        notificationType = relation.length === 2 ? 'match' : 'like';
                        if (!(notificationType === 'match')) return [3 /*break*/, 8];
                        return [4 /*yield*/, db_1.insertNotif(sender_id, recipient_id, 'match')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, db_1.insertNotif(recipient_id, sender_id, 'match')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, db_1.createChannel(sender_id, recipient_id)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, db_1.updatePopularityScore(recipient_id, 45)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, db_1.updatePopularityScore(sender_id, 30)];
                    case 7:
                        _a.sent();
                        if (senderUserSocket) {
                            senderUserSocket.emit('notifFromServer', { user_target_id: sender_id, user_source_id: recipient_id, notification_type: notificationType, timestamp: new Date() });
                        }
                        return [3 /*break*/, 11];
                    case 8: return [4 /*yield*/, db_1.insertNotif(sender_id, recipient_id, 'like')];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, db_1.updatePopularityScore(recipient_id, 15)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        if (userSocket) {
                            userSocket.emit('notifFromServer', { user_target_id: recipient_id, user_source_id: sender_id, notification_type: notificationType, timestamp: new Date() });
                            userSocket.emit('reloadConv');
                        }
                        return [3 /*break*/, 13];
                    case 12:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        }); })();
    });
    socket.on('dislike', function (data) {
        var sender_id = data.sender_id;
        var recipient_id = data.recipient_id;
        var userSocket = connectedSockets[recipient_id];
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, db_1.deleteChannel(sender_id, recipient_id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, db_1.deleteLike(sender_id, recipient_id)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db_1.insertNotif(sender_id, recipient_id, 'dislike')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, db_1.updatePopularityScore(recipient_id, -15)];
                    case 4:
                        _a.sent();
                        if (userSocket) {
                            userSocket.emit('notifFromServer', { user_target_id: recipient_id, user_source_id: sender_id, notification_type: 'dislike', timestamp: new Date() });
                            userSocket.emit('reloadConv');
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); })();
    });
    socket.on('blockUser', function (data) {
        var sender_id = data.sender_id;
        var recipient_id = data.recipient_id;
        var userSocket = connectedSockets[recipient_id];
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, db_1.blockUser(sender_id, recipient_id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, db_1.updatePopularityScore(recipient_id, -50)];
                    case 2:
                        _a.sent();
                        if (userSocket) {
                            userSocket.emit('reloadConv');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        console.log(error_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
    });
    socket.on('visited', function (data) {
        var sender_id = data.sender_id;
        var recipient_id = data.recipient_id;
        var userSocket = connectedSockets[recipient_id];
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!userSocket) return [3 /*break*/, 2];
                        return [4 /*yield*/, userUtils_1.isBlocked(sender_id, recipient_id)];
                    case 1:
                        if (!(_a.sent())) {
                            userSocket.emit('notifFromServer', { user_target_id: recipient_id, user_source_id: sender_id, notification_type: 'visited', timestamp: new Date() });
                        }
                        _a.label = 2;
                    case 2: return [4 /*yield*/, db_1.insertNotif(sender_id, recipient_id, 'visited')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, db_1.insertHistory(sender_id, recipient_id)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, db_1.updatePopularityScore(recipient_id, 3)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_8 = _a.sent();
                        console.log(error_8);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); })();
    });
    // Exemple : Écoute d'un événement et émission
    // socket.on('message', (data) => {
    // 	console.log('Received message:', data);
    // 	// Émettre le message à tous les clients connectés
    // 	io.emit('message', data);
    // });
    // D'autres événements et logique associée peuvent être ajoutés ici
});
// export function getSocketIoInstance(): Server | null {
// 	return io;
// }
// export function getSocketByUserId(userId: number): Socket | undefined {
// 	return connectedSockets[userId];
// }
server.listen(port, function () {
    console.log("Serveur Express en cours d'ex\u00E9cution sur le port " + port);
});
// mysql> INSERT INTO tag (tag_name) VALUES
//     -> ('Sport'), ('Music'),('Travel'),('Movies'),('TV shows'),('Reading'),
// 	('Cooking'),('Art'),('Fitness'),('Gaming'),('Dancing'),('Technology'),
// 	('Photography'), ('Running'),('Pets'),('Nature'),('Sciences'),('Cars'),('42')
// mysql> create table user_tag ( 
// 	user_id INT, tag_id INT, FOREIGN KEY (user_id) REFERENCES user(id),
// FOREIGN KEY (tag_id) REFERENCES tag(tag_id), PRIMARY KEY (user_id, tag_id));
// mysql> INSERT INTO user_tag (user_id, tag_id) VALUES (1, 3);
// mysql> SELECT * FROM user JOIN user_tag ON user.id = user_tag.user_id JOIN tag ON tag.tag_id = user_tag.tag_id;
// Les trucs mis en com :
// Apps getUserLocation(); useEffect
// Settings checkPassword(); useEffect
// Signup checkPassword();
// SELECT id, email, username, firstName, lastName, birth, gender, preference AS pref, SUBSTRING(description, 1, 11) AS description, photo1, photo2, photo3, photo4, photo5, all_infos_set AS allocation, verified, verified_token AS token from user WHERE id = 1;
// CREATE TABLE likes(
// 	id_user_source INT,
// 	id_user_target INT,
// 	PRIMARY KEY(id_user_source, id_user_target),
// 	FOREIGN KEY(id_user_source) REFERENCES user(id),
// 	FOREIGN KEY(id_user_target) REFERENCES user(id)
// );
// INSERT INTO likes (id_user_source, id_user_target)
// VALUES (1, 2);
// DELETE FROM likes
// WHERE id_user_source = 1 AND id_user_target = 2;
// Table pour stocker les conversations entre utilisateurs
// CREATE TABLE conversations (
// 	conversation_id INT PRIMARY KEY AUTO_INCREMENT,
// 	user1_id INT NOT NULL,
// 	user2_id INT NOT NULL,
// 	creation_date DATETIME NOT NULL,
// 	FOREIGN KEY (user1_id) REFERENCES user(id),
// 	FOREIGN KEY (user2_id) REFERENCES user(id)
//  );
// Table pour stocker les messages privés
// CREATE TABLE privateMessages (
//    message_id INT PRIMARY KEY AUTO_INCREMENT,
//    conversation_id INT NOT NULL,
//    sender_id INT NOT NULL,
//    recipient_id INT NOT NULL,
//    message_content TEXT NOT NULL,
//    timestamp DATETIME NOT NULL,
//    FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id),
//    FOREIGN KEY (sender_id) REFERENCES user(id),
//    FOREIGN KEY (recipient_id) REFERENCES user(id)
// );
// Cree conversation
// INSERT INTO Conversations (user1_id, user2_id, creation_date) VALUES (498, 999, NOW());
// Recuperer tous les id des conversations par rapport a un id d'un user
// SELECT conversations.conversation_id FROM conversations JOIN user ON conversations.user1_id = user.id OR conversations.user2_id = user.id WHERE user.id = 999;
// Pareil que avant mais avec le dernier message de chaque conversation
// SELECT
//     c.conversation_id,
//     c.user1_id,
//     c.user2_id,
//     c.creation_date,
//     pm.message_id AS last_message_id,
//     pm.sender_id AS last_message_sender_id,
//     pm.recipient_id AS last_message_recipient_id,
//     pm.message_content AS last_message_content,
//     pm.timestamp AS last_message_timestamp
// FROM
//     conversations AS c
// LEFT JOIN
//     privateMessages AS pm ON c.conversation_id = pm.conversation_id
//     AND pm.timestamp = (
//         SELECT MAX(timestamp) FROM privateMessages WHERE conversation_id = c.conversation_id
//     )
// WHERE
//     c.user1_id = 999 OR c.user2_id = 999;
// Envoyer un message dans une conversation
// INSERT INTO privateMessages (conversation_id, sender_id, recipient_id, message_content, timestamp) VALUES (5, 999, 498, 'Contenu du deuxieme message', NOW());
// Recuperer les messages d'une conversation
// SELECT privateMessages.message_id, privateMessages.sender_id, privateMessages.recipient_id, privateMessages.message_content, privateMessages.timestamp FROM privateMessages WHERE privateMessages.conversation_id = 5 ORDER BY PrivateMessages.timestamp;
// Création de la table "notificationsMessages" :
// CREATE TABLE notificationsMessages (
//     notification_id INT PRIMARY KEY AUTO_INCREMENT,
//     user_id INT,
//     conversation_id INT,
//     message_content TEXT,
//     FOREIGN KEY (user_id) REFERENCES user(id)
// );
// Insertion des notificationsMessages :
// INSERT INTO notificationsMessages (user_id, conversation_id, message_content)
// VALUES (1, 101, 'Nouveau message reçu');
// Récupération des notificationsMessages :
// SELECT * FROM notificationsMessages WHERE user_id = 1;
// Suppression des notificationsMessages pour un user:
// DELETE FROM notificationsMessages WHERE user_id = 1;
// Cree la table des notifications
// CREATE TABLE notifications (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     user_source_id INT,
//     user_target_id INT,
//     notification_type VARCHAR(20),
//     is_read BOOLEAN DEFAULT FALSE,
//     timestamp TIMESTAMP,
//     FOREIGN KEY (user_source_id) REFERENCES user(id),
//     FOREIGN KEY (user_target_id) REFERENCES user(id)
// );
// Inserer une notif
// INSERT INTO notifications (user_source_id, user_target_id, notification_type, timestamp)
// VALUES (1, 2, 'like', NOW());
// Recuperer les notifs d'un user
// SELECT * 
// FROM notifications
// WHERE user_target_id = 1;
// Cree la table pour l'historique
// CREATE TABLE history (
//     id_user_source INT,
//     id_user_target INT,
//     FOREIGN KEY(id_user_source) REFERENCES user(id),
//     FOREIGN KEY(id_user_target) REFERENCES user(id)
// );
// INSERT INTO history (id_user_source, id_user_target)
// VALUES (1, 2);
// CREATE TABLE blockUser(
// 	id_user_source INT,
// 	id_user_target INT,
// 	PRIMARY KEY(id_user_source, id_user_target),
// 	FOREIGN KEY(id_user_source) REFERENCES user(id),
// 	FOREIGN KEY(id_user_target) REFERENCES user(id)
// );
// CREATE TABLE reportUser(
// 	id_user_source INT,
// 	id_user_target INT,
// 	PRIMARY KEY(id_user_source, id_user_target),
// 	FOREIGN KEY(id_user_source) REFERENCES user(id),
// 	FOREIGN KEY(id_user_target) REFERENCES user(id)
// );
