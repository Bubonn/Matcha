import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export class BackApi {
	static async getAllUsers() {
		const rep = await axios.get(`${BASE_URL}/users`)
			// .then(rep => rep)
			// .catch(error => error)
		return rep;
	}

	static async signup(infoUser: any) {
		try {
			const response = await axios.post(`${BASE_URL}/signup`, infoUser);
			return response;
		} catch (error: any) {
			// console.error('Erreur lors de la création de l\'utilisateur :', error);
			// console.log('TEST', error.message);
			// console.log('error', error.response.data.error);
			console.log('error', error.response);
			return error;
			// return response
			// throw error;
		}
	}

	static async signin(infoUser: any) {
		// try {
			const response = await axios.post(`${BASE_URL}/signin`, infoUser);
			return response;
		// } catch (error: any) {
			// throw error;
		// }
	}
}