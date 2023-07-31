import axios from "axios";

const BASE_URL = 'http://localhost:3000';
const TOKEN_IPINFO = '8e7deabe707a09';

export class BackApi {
	static async getAllUsers() {
		const rep = await axios.get(`${BASE_URL}/users/users`)
			// .then(rep => rep)
			// .catch(error => error)
		return rep;
	}

	static async getUserById(id: number, token: string) {
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

	static async getPhotoById(id: number, token: string) {
		try {
			const rep = await axios.get(`${BASE_URL}/users/photo/${id}`, {
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
			// return 'Erreur signin';
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
			if (error.response && error.response.data && error.response.data.error) {
				return error.response.data.error;
			} else {
				return ({data: 'Le format de fichier n\'est pas accepte'});
			}
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

	static async addInterest(token: string, idInterest: number) {
		try {
			const response = await axios.patch(`http://localhost:3000/users/addInterest`, {
				"idInterest": idInterest
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

	static async delInterest(token: string, idInterest: number) {
		try {
			const response = await axios.patch(`http://localhost:3000/users/delInterest`, {
				"idInterest": idInterest
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

	static async updateUsername(token: string, username: string) {
		try {
			const response = await axios.patch(`http://localhost:3000/users/username`, {
				"username": username
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async updateFirstName(token: string, firstName: string) {
		try {
			const response = await axios.patch(`http://localhost:3000/users/firstName`, {
				"firstName": firstName
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async updateLastName(token: string, lastName: string) {
		try {
			const response = await axios.patch(`http://localhost:3000/users/lastName`, {
				"lastName": lastName
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async updateEmail(token: string, email: string) {
		try {
			const response = await axios.patch(`http://localhost:3000/users/email`, {
				"email": email
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async updatePassword(token: string, password: string) {
		try {
			const response = await axios.patch(`http://localhost:3000/users/password`, {
				"password": password
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async updateLocation(token: string, location: string) {
		try {
			const response = await axios.post(`http://localhost:3000/users/location`, {
				"location": location
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return response;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async getIpInfo() {
		try {
			const rep = await axios.get(`https://ipinfo.io/json?token=${TOKEN_IPINFO}`);
			return rep;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async sendEmail(token: string) {
		try {
			const rep = await axios.get(`http://localhost:3000/users/email`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return rep;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async verifyEmail(token: string) {
		console.log('Front Call Back', token);
		try {
			const rep = await axios.get(`http://localhost:3000/login/verifyToken`, {
				params: {
					token,
				},
			});
			return rep;
		} catch (error: any) {
			return error.response.data.error;
		}
	}
}
