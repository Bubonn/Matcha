"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketByUserId = exports.getSocketIoInstance = void 0;
const db_1 = require("./services/db");
const token_1 = require("./utils/token");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const login_1 = __importDefault(require("./routes/login"));
const user_1 = __importDefault(require("./routes/user"));
const uploads_1 = __importDefault(require("./routes/uploads"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, db_1.createConnection)();
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
    console.log('User connected via Socket.io');
    socket.on('userConnect', (data) => {
        const userId = data.userId;
        connectedSockets[userId] = socket;
        console.log(`User ${userId} connected via Socket.io`);
        // Traitez la connexion de l'utilisateur ici
    });
    socket.on('message', (data) => {
        const conversation_id = data.conversation_id;
        const message_content = data.message_content;
        const recipient_id = data.recipient_id;
        const sender_id = data.sender_id;
        const timestamp = data.timestamp;
        // console.log(message);
        // console.log('userid', userId);
        socket.emit('messageFromServer', { conversation_id: conversation_id, message_content: message_content, recipient_id: recipient_id, sender_id: sender_id, timestamp: timestamp });
        const userSocket = connectedSockets[recipient_id];
        if (userSocket) {
            userSocket.emit('messageFromServer', { conversation_id: conversation_id, message_content: message_content, recipient_id: recipient_id, sender_id: sender_id, timestamp: timestamp });
        }
    });
    socket.on('userDisconnect', (data) => {
        const userId = data.userId;
        delete connectedSockets[userId];
        console.log(`User ${userId} disconnected via Socket.io`);
        // Traitez la déconnexion de l'utilisateur ici
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
    // Exemple : Écoute d'un événement et émission
    // socket.on('message', (data) => {
    // 	console.log('Received message:', data);
    // 	// Émettre le message à tous les clients connectés
    // 	io.emit('message', data);
    // });
    // D'autres événements et logique associée peuvent être ajoutés ici
});
io.on('connection', (socket) => {
    socket.on('test', (data) => {
        console.log('TEST socket');
    });
});
function getSocketIoInstance() {
    return io;
}
exports.getSocketIoInstance = getSocketIoInstance;
function getSocketByUserId(userId) {
    return connectedSockets[userId];
}
exports.getSocketByUserId = getSocketByUserId;
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
