import { createConnection } from './services/connectionDb';
import { authenticateToken } from './utils/token';
import { Server, Socket } from 'socket.io'
import express from 'express';
import cors from 'cors';
import login from './routes/login';
import users from './routes/user';
import uploads from './routes/uploads';
import dotenv from 'dotenv';
import http from 'http';
import { deleteLike, insertLike, insertMessage, insertNotif } from './services/db';

dotenv.config();

const app = express();
const port = 3000;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

createConnection();

app.use('/login', login);

app.use(authenticateToken);

app.use('/users', users);
app.use('/uploads', uploads);


const io = new Server(server, {
	cors: {
		origin: "http://localhost:3001",
		methods: ["GET", "POST"],
	},
});

const connectedSockets: any = {};

io.on('connection', (socket) => {
	console.log('User connected via Socket.io');
	socket.on('userConnect', (data) => {
		const userId = data.userId;
		connectedSockets[userId] = socket;
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
		insertMessage(conversation_id, message_content, recipient_id, sender_id);
	})

	socket.on('like', (data) => {
		const sender_id = data.sender_id;
		const recipient_id = data.recipient_id;
		insertLike(sender_id, recipient_id);
		insertNotif(sender_id, recipient_id, 'like')
	})

	socket.on('dislike', (data) => {
		const sender_id = data.sender_id;
		const recipient_id = data.recipient_id;
		deleteLike(sender_id, recipient_id);
		insertNotif(sender_id, recipient_id, 'dislike')
	})

	socket.on('userDisconnect', (data) => {
		const userId = data.userId;
		delete connectedSockets[userId];
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