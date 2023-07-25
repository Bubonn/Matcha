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

	static async upload(userId: number, formData: any) {
		try {
			const response = await axios.post(`http://localhost:3000/uploads/${userId}`, formData);
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async removePhoto(userId: number, photoId: any) {
		try {
			const response = await axios.delete(`http://localhost:3000/uploads/${userId}?photoId=${photoId}`, { data: { photoId } });
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}
}
