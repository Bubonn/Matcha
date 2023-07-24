import express from 'express';
import cors from 'cors';
import { createConnection } from './services/db';
import login from './routes/login';
import users from './routes/user';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

createConnection();

app.use('/users', users);
app.use('/login', login);

app.listen(port, () => {
	console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
