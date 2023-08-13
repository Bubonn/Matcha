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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectionDb_1 = require("./services/connectionDb");
const token_1 = require("./utils/token");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const login_1 = __importDefault(require("./routes/login"));
const user_1 = __importDefault(require("./routes/user"));
const uploads_1 = __importDefault(require("./routes/uploads"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const db_1 = require("./services/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, connectionDb_1.createConnection)();
app.use('/login', login_1.default);
app.use(token_1.authenticateToken);
app.use('/users', user_1.default);
app.use('/uploads', uploads_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
    },
});
const connectedSockets = {};
io.on('connection', (socket) => {
    socket.on('userConnect', (data) => {
        const userId = data.userId;
        console.log(`User ${userId} connected via Socket.io`);
        connectedSockets[userId] = socket;
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, db_1.userConnected)(userId);
            }
            catch (error) {
                console.log(error);
            }
        }))();
    });
    socket.on('userDisconnect', (data) => {
        console.log('A');
        const userId = data.userId;
        console.log(`User ${userId} DISconnected via Socket.io`);
        delete connectedSockets[userId];
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, db_1.userDisonnected)(userId);
            }
            catch (error) {
                console.log(error);
            }
        }))();
    });
    socket.on('disconnect', () => {
        console.log('B');
        const disconnectedUserId = Object.keys(connectedSockets).find((userId) => connectedSockets[userId] === socket);
        if (disconnectedUserId) {
            console.log(`User ${disconnectedUserId} disconnected`);
            delete connectedSockets[disconnectedUserId];
            (() => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield (0, db_1.userDisonnected)(Number(disconnectedUserId));
                }
                catch (error) {
                    console.log(error);
                }
            }))();
        }
        else {
            console.log('A user disconnected');
        }
    });
    socket.on('message', (data) => {
        const conversation_id = data.conversation_id;
        const message_content = data.message_content;
        const recipient_id = data.recipient_id;
        const sender_id = data.sender_id;
        const timestamp = data.timestamp;
        socket.emit('messageFromServer', { conversation_id: conversation_id, message_content: message_content, recipient_id: recipient_id, sender_id: sender_id, timestamp: timestamp });
        const userSocket = connectedSockets[recipient_id];
        if (userSocket) {
            userSocket.emit('messageFromServer', { conversation_id: conversation_id, message_content: message_content, recipient_id: recipient_id, sender_id: sender_id, timestamp: timestamp });
        }
        (0, db_1.insertMessage)(conversation_id, message_content, recipient_id, sender_id);
    });
    socket.on('like', (data) => {
        const sender_id = data.sender_id;
        const recipient_id = data.recipient_id;
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, db_1.insertLike)(sender_id, recipient_id);
                yield (0, db_1.insertNotif)(sender_id, recipient_id, 'like');
                const userSocket = connectedSockets[recipient_id];
                const senderUserSocket = connectedSockets[sender_id];
                const relation = yield (0, db_1.getRelaion)(sender_id, recipient_id);
                const notificationType = relation.length === 2 ? 'match' : 'like';
                if (notificationType === 'match') {
                    yield (0, db_1.createChannel)(sender_id, recipient_id);
                    senderUserSocket.emit('notifFromServer', { recipient_id: sender_id, sender_id: recipient_id, notification_type: notificationType, timestamp: new Date() });
                }
                if (userSocket) {
                    userSocket.emit('notifFromServer', { recipient_id: recipient_id, sender_id: sender_id, notification_type: notificationType, timestamp: new Date() });
                }
            }
            catch (error) {
                console.log(error);
            }
        }))();
    });
    socket.on('dislike', (data) => {
        const sender_id = data.sender_id;
        const recipient_id = data.recipient_id;
        const userSocket = connectedSockets[recipient_id];
        if (userSocket) {
            userSocket.emit('notifFromServer', { recipient_id: recipient_id, sender_id: sender_id, notification_type: 'dislike', timestamp: new Date() });
        }
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, db_1.deleteChannel)(sender_id, recipient_id);
                yield (0, db_1.deleteLike)(sender_id, recipient_id);
                yield (0, db_1.insertNotif)(sender_id, recipient_id, 'dislike');
            }
            catch (error) {
                console.log(error);
            }
        }))();
    });
    socket.on('visited', (data) => {
        const sender_id = data.sender_id;
        const recipient_id = data.recipient_id;
        const userSocket = connectedSockets[recipient_id];
        if (userSocket) {
            userSocket.emit('notifFromServer', { recipient_id: recipient_id, sender_id: sender_id, notification_type: 'visited', timestamp: new Date() });
        }
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, db_1.insertNotif)(sender_id, recipient_id, 'visited');
                yield (0, db_1.insertHistory)(sender_id, recipient_id);
            }
            catch (error) {
                console.log(error);
            }
        }))();
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
server.listen(port, () => {
    console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
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
