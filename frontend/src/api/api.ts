import axios from "axios";

const MAP_TOKEN= 'pk.eyJ1IjoiYnVib24iLCJhIjoiY2xrcmV0YzRoMHV5MjNpcDZ6MHFmMGVlYiJ9.PToP4PVdj_PwnfPV517RgA';
const TOKEN_IPINFO = '8e7deabe707a09';

export class Api {
	static async getIpInfo() {
		try {
			const rep = await axios.get(`https://ipinfo.io/json?token=${TOKEN_IPINFO}`);
			return rep;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async getSuggestionCity(inputUser: string) {
		try {
			const rep = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${inputUser}.json?types=place&language=fr&access_token=${MAP_TOKEN}`);
			return rep;
		} catch (error: any) {
			return error.response.data.error;
		}
	}

	static async getCityByPositionGps(gps: string) {
		try {
			const coordsUser = gps.split(',');
			const rep = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordsUser[1]},${coordsUser[0]}.json?types=place&language=fr&access_token=${MAP_TOKEN}`);
			return rep;
		} catch (error: any) {
			return error;
		}
	}
}