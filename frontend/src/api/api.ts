import axios from "axios";

export class Api {
	static async getIpInfo() {
		try {
			const rep = await axios.get(`https://ipinfo.io/json?token=${process.env.TOKEN_IPINFO}`);
			return rep;
		} catch (error: any) {
			return error.response.data.error;
		}
	}


}