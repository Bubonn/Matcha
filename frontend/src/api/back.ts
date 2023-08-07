import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export class BackApi {
	static async getAllUsers(token : string) {
		try {
		const rep = await axios.get(`${BASE_URL}/users/`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return rep;
	} catch (error: any) {
		return error.response.data.error;
	}
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
			const response = await axios.post(`${BASE_URL}/uploads`, formData, {
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
			const response = await axios.delete(`${BASE_URL}/uploads?photoId=${photoId}`, {
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
			const response = await axios.get(`${BASE_URL}/login/token`, {
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
			const response = await axios.post(`${BASE_URL}/users/birthDate`, {
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
			const response = await axios.post(`${BASE_URL}/users/gender`, {
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
			const response = await axios.post(`${BASE_URL}/users/preference`, {
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
			const response = await axios.post(`${BASE_URL}/users/description`, {
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
			const response = await axios.post(`${BASE_URL}/users/interest`, {
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
			const response = await axios.patch(`${BASE_URL}/users/addInterest`, {
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
			const response = await axios.patch(`${BASE_URL}/users/delInterest`, {
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
			const response = await axios.patch(`${BASE_URL}/users/allInfosSet`, {}, {
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
			const response = await axios.patch(`${BASE_URL}/users/username`, {
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
			const response = await axios.patch(`${BASE_URL}/users/firstName`, {
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
			const response = await axios.patch(`${BASE_URL}/users/lastName`, {
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
			const response = await axios.patch(`${BASE_URL}/users/email`, {
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
			const response = await axios.patch(`${BASE_URL}/users/password`, {
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
			const response = await axios.post(`${BASE_URL}/users/location`, {
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

	static async sendEmail(token: string) {
		try {
			const rep = await axios.get(`${BASE_URL}/users/email`, {
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
		try {
			const rep = await axios.get(`${BASE_URL}/login/verifyToken`, {
				params: {
					token,
				},
			});
			return rep;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async getSuggestions(token: string, maxDistance: number, differencePopularity: number, ageFrom: number, ageTo: number, interests: any) {
		try {
			const rep = await axios.get(`${BASE_URL}/users/suggestions`, {
				headers: {
					Authorization: `Bearer ${token}`
				},
				params: {
					maxDistance: maxDistance,
					differencePopularity: differencePopularity,
					ageFrom: ageFrom,
					ageTo: ageTo,
					interests: interests
				}
			});
			return rep;
		} catch (error: any) {
			return error;
		}
	}

	static async manyUsers(token: string, ids: any) {
		try {
			const rep = await axios.get(`${BASE_URL}/users/manyUsers`, {
				headers: {
					Authorization: `Bearer ${token}`
				},
				params: {
					ids: ids
				}
			});
			return rep;
		} catch (error: any) {
			return error;
		}
	}

	static async getTags(token: string) {
		try {
			const rep = await axios.get(`${BASE_URL}/users/tags`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return rep;
		} catch (error: any) {
			return error;
		}
	}

	static async likeUser(token: string, idLiked: any) {
		try {
			const rep = await axios.post(`${BASE_URL}/users/likeUser`, {
				"idLiked": idLiked
			}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return rep;
		} catch (error: any) {
			return error.response.data.message;
		}
	}

	static async dislikeUser(token: string, idDisliked: any) {
		try {
			const rep = await axios.post(`${BASE_URL}/users/dislikeUser`, {
				"idDisliked": idDisliked
			}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return rep;
		} catch (error: any) {
			return error.response.data.message;
		}
	}

	static async getRelation(token: string, userId: any) {
		try {
			const rep = await axios.get(`${BASE_URL}/users/relation/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return rep;
		} catch (error: any) {
			return error.response.data.message;
		}
	}
}
