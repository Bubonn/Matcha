import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export class BackApi {
	static async getAllUsers() {
		const rep = await axios.get(`${BASE_URL}/users/users`)
			// .then(rep => rep)
			// .catch(error => error)
		return rep;
	}

	static async signup(infoUser: any) {
		try {
			const response = await axios.post(`${BASE_URL}/login/signup`, infoUser);
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async signin(infoUser: any) {
		try {
			const response = await axios.post(`${BASE_URL}/login/signin`, infoUser);
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}
}