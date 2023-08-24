import axios from "axios";

export class Api {
	static async getIpInfo() {
		try {
			const rep = await axios.get(`https://ipinfo.io/json?token=${process.env.REACT_APP_TOKEN_IPINFO}`);
			return rep;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async getSuggestionCity(inputUser: string) {
		try {
			const rep = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${inputUser}.json?types=place&language=fr&access_token=${process.env.REACT_APP_MAP_TOKEN}`);
			return rep;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async getCityByPositionGps(gps: string) {
		try {
			const coordsUser = gps.split(',');
			const rep = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordsUser[1]},${coordsUser[0]}.json?types=place&language=fr&access_token=${process.env.REACT_APP_MAP_TOKEN}`);
			return rep;
		} catch (error: any) {
			return error;
		}
	}
}