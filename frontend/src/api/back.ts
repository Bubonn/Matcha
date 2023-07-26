import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export class BackApi {
	static async getAllUsers() {
		const rep = await axios.get(`${BASE_URL}/users/users`)
			// .then(rep => rep)
			// .catch(error => error)
		return rep;
	}

	static async getUserById(id: number, token: string) {
		// console.log('TEST Call api id', id);
		try {
			const rep = await axios.get(`${BASE_URL}/users/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return rep;
		} catch (error: any) {
			return error.response.data.error;
		}
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

	static async upload(token: string, formData: any) {
		try {
			const response = await axios.post(`http://localhost:3000/uploads`, formData, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async removePhoto(photoId: any, token: string) {
		try {
			const response = await axios.delete(`http://localhost:3000/uploads?photoId=${photoId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				data: {
					photoId,
				},
			});
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}


	static async checkToken(token : string) {
		try {
			const response = await axios.get(`http://localhost:3000/login/token`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async updateBirth(token: string, date: any) {
		try {
			const response = await axios.post(`http://localhost:3000/users/birthDate`, {
				"birthDate": date
			}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async updateGender(token: string, gender: string) {
		try {
			const response = await axios.post(`http://localhost:3000/users/gender`, {
				"gender": gender
			}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async updatePreference(token: string, preference: string) {
		try {
			const response = await axios.post(`http://localhost:3000/users/preference`, {
				"preference": preference
			}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async updateDescripion(token: string, description: string) {
		try {
			const response = await axios.post(`http://localhost:3000/users/description`, {
				"description": description
			}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async updateInterests(token: string, interests: number[]) {
		try {
			const response = await axios.post(`http://localhost:3000/users/interest`, {
				"interests": interests
			}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async updateAllInfosSet(token: string) {
		try {
			const response = await axios.patch(`http://localhost:3000/users/allInfosSet`, {}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}
}
