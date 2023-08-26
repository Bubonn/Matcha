import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import s from './style.module.css'

import React, { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';
import { BackApi } from '../../api/back';
import { useNavigate } from 'react-router-dom';

export function MapUser({usersSelected}: {usersSelected: any}) {
	const navigate = useNavigate();
	const [usersCoords, setUsersCoords] = useState<any>(null);

	function getCoords(user: any) {
			const parties = user.location.split(',');
			if (parties.length === 2) {
				const [latitude, longitude] = parties;
				user.longitude = longitude;
				user.latitude = latitude;
			}
	}

	async function getUsersSelected() {
		// const token = getToken();
		// if (token) {
		// 	const arrayOfIds = [12001, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006, 12002, 12003, 12004, 12005, 12006];
	
		// 	const rep = await BackApi.manyUsers(token, arrayOfIds);
		// 	if (rep.status === 200) {

				// const usersSelect = rep.data;
				let tmp: any[] = [];
				
				for (const userSelect of usersSelected) {
					if (userSelect.location) {
						getCoords(userSelect);
						tmp.push(userSelect);
					}
				}
				setUsersCoords(tmp);
			// }
		// }
	}

	const Map = ReactMapboxGl({
		accessToken: 'pk.eyJ1IjoiYnVib24iLCJhIjoiY2xrcmV0YzRoMHV5MjNpcDZ6MHFmMGVlYiJ9.PToP4PVdj_PwnfPV517RgA',
		// accessToken: 'ppk.eyJ1IjoiYnVib24iLCJhIjoiY2xrcmV0YzRoMHV5MjNpcDZ6MHFmMGVlYiJ9.PToP4PVdj_PwnfPV517RgA',
		// minZoom: 10, // Zoom vers le haut
		// maxZoom: 199 // Zoom vers le bas
	});

	useEffect(() => {
		getUsersSelected();
	}, [])

	if (!usersCoords) {
		return (<></>);
	}

	return (
		<div className={s.container}>
			<Map
				style="mapbox://styles/mapbox/streets-v9"
				containerStyle={{
					height: '100%',
					width: '100%'
				}}
				center={[2.3037096141447364, 46.90854262113237]}
				zoom={[5]}
			>
				{usersCoords.map((user: any) => {
					return (
						<React.Fragment key={user.id}>
							<Marker
								coordinates={[user.longitude, user.latitude]}
								onClick={() => navigate(`/profile/${user.id}`)}
							>
								<img className={s.imgUser} src={`data:image/jpeg;base64,${user.mainPhoto}`}></img>
							</Marker>
						</React.Fragment>
					)
				}
				)}
			</Map>
		</div>
	);
}
