// import express from 'express';
// import cors from 'cors';
// import mysql from 'mysql2';
// import argon2 from 'argon2';

// const app = express();

// const connection = mysql.createConnection({
// 	host: '127.0.0.1',
// 	user: 'root',
// 	password: 'rootpass',
// 	database: 'flirtopia',
// });

// connection.connect((err: any) => {
// 	if (err) {
// 		console.error('Erreur de connexion à la base de données:', err);
// 	} else {
// 		console.log('Connecté à la base de données MySQL !');
// 	}
// });

// app.use(cors());
// app.use(express.json());

// const acceptJsonOnly = (req: any, res: any, next: any) => {
// 	if (req.is('json')) {
// 	  next();
// 	} else {
// 	  res.status(400).json({ error: 'Requête accepte uniquement le format JSON.' });
// 	}
// };

// app.get('/users', (req: any, res: any) => {
// 	const query = 'SELECT * FROM user';

// 	connection.query(query, (err: any, results: any) => {
// 		if (err) {
// 			console.error('Erreur lors de l\'exécution de la requête:', err);
// 			res.status(500).json({ error: 'Erreur lors de la récupération des éléments.' });
// 		} else {
// 			res.json(results);
// 		}
// 	});
// });

// app.post('/signup', acceptJsonOnly, async (req: any, res: any) => {
// 		const { email, username, firstName, lastName, password } = req.body;

// 		if (!email || !username || !firstName || !lastName || !password) {
// 			return res.status(401).json({ error: 'Missing required parameters.' });
// 		}

// 		const checkUserQuery = 'SELECT * FROM user WHERE username = ?';
// 		const checkUserValues = [username];
	
// 		try {
// 			const checkUserResult: any = await new Promise((resolve, reject) => {
// 				connection.query(checkUserQuery, checkUserValues, (checkUserErr: any, checkUserResults: any) => {
// 					if (checkUserErr) {
// 						reject(new Error('Une erreur est survenue lors de la vérification du nom d\'utilisateur.'));
// 					} else {
// 						resolve(checkUserResults);
// 					}
// 				});
// 			});
// 			if (checkUserResult.length > 0) {
// 						// throw new Error('Username already taken.');
// 						return res.status(409).json({ error: 'Username already taken.' });
// 			}
// 		} catch (error) {
// 			return res.status(500).json({ error: 'Internal server error. Please try again later.' });
// 		}

// 		const hashedPassword = await argon2.hash(password);

// 		const sql = 'INSERT INTO user (email, username, firstName, lastName, password) VALUES (?, ?, ?, ?, ?);';
// 		const values = [email, username, firstName, lastName, hashedPassword];

// 		connection.query(sql, values, (err: any, result: any) => {
// 			if (err) {
// 				console.error('Erreur lors de l\'ajout de l\'utilisateur :', err);
// 				// return res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout de l\'utilisateur.' });
// 			}
// 			console.log('Nouvel utilisateur ajouté avec l\'ID :', result.insertId);
// 			return res.json({ success: true });
// 		});
// });

// app.post('/signin', acceptJsonOnly, async (req: any, res: any) => {
// 	try {
// 		const { username, password } = req.body;

// 		if (!username || !password) {
// 			throw new Error('Tous les champs sont obligatoires.');
// 		}

// 		const sql = 'SELECT username, password FROM user WHERE username = ?;';
// 		const values = [username];

// 		// Convertir la fonction de rappel en une promesse
// 		const queryAsync = () => {
// 			return new Promise((resolve, reject) => {
// 				connection.query(sql, values, (err: any, results: any) => {
// 					if (err) {
// 						reject(err);
// 					} else {
// 						resolve(results);
// 					}
// 				});
// 			});
// 		};

// 		// Appeler la nouvelle fonction asynchrone pour obtenir les résultats de la requête
// 		const results: any = await queryAsync();

// 		if (results.length === 0) {
// 			console.log('Utilisateur non trouvé');
// 			res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect.' });
// 		} else {
// 			const user = results[0];
// 			const storedUsername = user.username;
// 			const storedPassword = user.password;
// 				const isMatch = await argon2.verify(storedPassword, password);
// 				if (isMatch) {
// 					console.log('Authentification réussie pour l\'utilisateur :', storedUsername);
// 					res.json({ success: true });
// 				} else {
// 					console.log('Mot de passe incorrect pour l\'utilisateur :', storedUsername);
// 					res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect.' });
// 				}
// 		}
// 	} catch (error: any) {
// 		console.error('Erreur lors de la récupération des informations d\'utilisateur :', error);
// 		res.status(400).json({ error: error.message });
// 	}
// });



// const port = 3000;
// app.listen(port, () => {
// 	console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
// });

// CREATE TABLE user (
// 	id INT AUTO_INCREMENT PRIMARY KEY,
// 	email VARCHAR(50) NOT NULL,
// 	username VARCHAR(50) NOT NULL,
// 	firstName VARCHAR(50) NOT NULL,
// 	lastName VARCHAR(50) NOT NULL,
// 	password VARCHAR(200) NOT NULL
// );


	// {
	// 	"email": "test@jb.com",
	// 	"username": "jdubilla",
	// 	"firstName": "jb",
	// 	"lastName": "Dubi",
	// 	"password": "Jbdpass"
	// }
	










import express from 'express';
import cors from 'cors';
import { createConnection } from './services/db';
import routes from './routes/login';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

createConnection();

app.use('/login', routes);

app.listen(port, () => {
	console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
