import { getConnection } from "./connectionDb";

export const insertMessage = async (conversation_id: number, message_content: string, recipient_id: number, sender_id: number) => {
	try {

		const connection = getConnection();
		
		const query = 'INSERT INTO privateMessages (conversation_id, sender_id, recipient_id, message_content, timestamp) VALUES (?, ?, ?, ?, NOW())';
		
		const relation: any = await new Promise((resolve, reject) => {
			connection.query(query, [conversation_id, sender_id, recipient_id, message_content], (err: any, results: any) => {
				if (err) {
					reject(new Error('Erreur lors de l\'exécution de la requête'));
				} else {
					resolve(results);
				}
			});
		});
	} catch (error) {
		console.log('Erreur lors de l\'exécution de la requête');
	}
}

export const insertLike = async (id_user_source: number, id_user_target: number) => {

	try {
		const connection = getConnection();

		await new Promise<void>((resolve, reject) => {
				const insertQuery = 'INSERT INTO likes (id_user_source, id_user_target) VALUES (?, ?)';
				const values = [id_user_source, id_user_target];

				connection.query(insertQuery, values, (error) => {
					if (error) {
						reject(new Error('Error occurred while liked user'));
					} else {
						resolve();
					}
				});
		});
	} catch (error) {
		console.log('Erreur lors de l\'exécution de la requête');
	}
}

export const deleteLike = async (id_user_source: number, id_user_target: number) => {

	try {
		const connection = getConnection();

		await new Promise<void>((resolve, reject) => {
				const insertQuery = 'DELETE FROM likes WHERE id_user_source = ? AND id_user_target = ?';
				const values = [id_user_source, id_user_target];

				connection.query(insertQuery, values, (error) => {
					if (error) {
						reject(new Error('Error occurred while dislike user'));
					} else {
						resolve();
					}
				});
		});
	} catch (error) {
		console.log('Erreur lors de l\'exécution de la requête');
	}
}

export const insertNotif = async (id_user_source: number, id_user_target: number, notification: string) => {

	try {
		const connection = getConnection();

		await new Promise<void>((resolve, reject) => {
				const insertQuery = 'INSERT INTO notifications (user_source_id, user_target_id, notification_type, timestamp)\
				VALUES (?, ?, ?, NOW());';
				const values = [id_user_source, id_user_target, notification];

				connection.query(insertQuery, values, (error) => {
					if (error) {
						reject(new Error('Erreur lors de l\'exécution de la requête'));
					} else {
						resolve();
					}
				});
		});
	} catch (error) {
		console.log('Erreur lors de l\'exécution de la requête');
	}
}

export const getRelaion = async (id_user_source: number, id_user_target: number) => {

	try {
		const connection = getConnection();

		const relation = await new Promise((resolve, reject) => {
			const query = 'SELECT * FROM likes WHERE (id_user_source = ? AND id_user_target = ?) \
			OR (id_user_source = ? AND id_user_target = ?)';

			connection.query(query, [id_user_source, id_user_target, id_user_target, id_user_source], (err: any, results: any) => {
				if (err) {
					reject(new Error('Erreur lors de l\'exécution de la requête'));
				} else {
					resolve(results);
				}
			});
		});
		return relation;
	} catch (error) {
		console.log('Erreur lors de l\'exécution de la requête');
	}
}

export const createChannel = async (id_user_source: number, id_user_target: number) => {

	try {
		const connection = getConnection();

		const channel: any = await new Promise((resolve, reject) => {
			const query = 'SELECT * FROM conversations WHERE user1_id = ? AND user2_id = ? OR user1_id = ? and user2_id = ?';

			connection.query(query, [id_user_source, id_user_target, id_user_target, id_user_source], (err: any, results: any) => {
				if (err) {
					reject(new Error('Erreur lors de l\'exécution de la requête'));
				} else {
					resolve(results);
				}
			});
		});
		
		if (channel.length === 1) {
			return ;
		}

		await new Promise((resolve, reject) => {
			const query = 'INSERT INTO Conversations (user1_id, user2_id, creation_date) VALUES (?, ?, NOW())';

			connection.query(query, [id_user_source, id_user_target], (err: any, results: any) => {
				if (err) {
					reject(new Error('Erreur lors de l\'exécution de la requête'));
				} else {
					resolve(results);
				}
			});
		});

	} catch (error) {
		console.log('Erreur lors de l\'exécution de la requête');
	}
}

export const deleteChannel = async (id_user_source: number, id_user_target: number) => {

	try {
		const connection = getConnection();

		const channel: any = await new Promise((resolve, reject) => {
			const query = 'SELECT * FROM conversations WHERE user1_id = ? AND user2_id = ? OR user1_id = ? and user2_id = ?';

			connection.query(query, [id_user_source, id_user_target, id_user_target, id_user_source], (err: any, results: any) => {
				if (err) {
					reject(new Error('Erreur lors de l\'exécution de la requête'));
				} else {
					resolve(results);
				}
			});
		});
		if (channel.length !== 1) {
			return ;
		}

		const channelId = channel[0].conversation_id;

		await new Promise((resolve, reject) => {
			const query = 'DELETE from privateMessages WHERE conversation_id = ?';

			connection.query(query, [channelId], (err: any, results: any) => {
				if (err) {
					reject(new Error('Erreur lors de l\'exécution de la requête'));
				} else {
					resolve(results);
				}
			});
		});

		await new Promise((resolve, reject) => {
			const query = 'DELETE from conversations WHERE conversation_id = ?';

			connection.query(query, [channelId], (err: any, results: any) => {
				if (err) {
					reject(new Error('Erreur lors de l\'exécution de la requête'));
				} else {
					resolve(results);
				}
			});
		});

	} catch (error) {
		console.log('Erreur lors de l\'exécution de la requête');
	}
}

export const insertHistory = async (id_user_source: number, id_user_target: number) => {

	try {
		const connection = getConnection();

		await new Promise<void>((resolve, reject) => {
				const insertQuery = 'INSERT INTO history (id_user_source, id_user_target) VALUES (?, ?)';
				const values = [id_user_source, id_user_target];

				connection.query(insertQuery, values, (error) => {
					if (error) {
						reject(new Error('Error occurred while insert visit'));
					} else {
						resolve();
					}
				});
		});
	} catch (error) {
		console.log('Erreur lors de l\'exécution de la requête');
	}
}