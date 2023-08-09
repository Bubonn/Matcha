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