import mysql from 'mysql2';

let connection: mysql.Connection;

export const createConnection = () => {
	connection = mysql.createConnection({
		host: '127.0.0.1',
		user: 'root',
		password: 'rootpass',
		database: 'flirtopia',
	});

	connection.connect((err: any) => {
		if (err) {
			console.error('Erreur de connexion à la base de données :', err);
		} else {
			console.log('Connecté à la base de données MySQL !');
		}
	});
};

export const getConnection = () => {
	if (!connection) {
		throw new Error('La connexion à la base de données n\'a pas encore été établie.');
	}
	return connection;
};
