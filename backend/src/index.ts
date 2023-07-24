import express from 'express';
import cors from 'cors';
import { createConnection } from './services/db';
import login from './routes/login';
import users from './routes/user';
import uploads from './routes/uploads';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

createConnection();

app.use('/users', users);
app.use('/login', login);
app.use('/uploads', uploads);

app.listen(port, () => {
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

// mysql> SELECT * FROM user JOIN user_tag ON user.id = user_tag.user_id
//     -> JOIN tag ON tag.tag_id = user_tag.tag_id;