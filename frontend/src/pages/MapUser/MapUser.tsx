//import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
//import { useNavigate } from 'react-router-dom';
//import 'mapbox-gl/dist/mapbox-gl.css';
//import React, { useEffect, useState } from 'react';
//import s from './style.module.css'

//export function MapUser({usersSelected}: {usersSelected: any}) {
//	const navigate = useNavigate();
//	const [usersCoords, setUsersCoords] = useState<any>(null);
//	const [apiKey, setApiKey] = useState<any>(null);

//	function getCoords(user: any) {
//		const parties = user.location.split(',');
//		if (parties.length === 2) {
//			const [latitude, longitude] = parties;
//			user.longitude = longitude;
//			user.latitude = latitude;
//		}
//	}

//	async function getUsersSelected() {
//		setApiKey(process.env.REACT_APP_MAP_TOKEN);

//		let tmp: any[] = [];

//		for (const userSelect of usersSelected) {
//			if (userSelect.location) {
//				getCoords(userSelect);
//				tmp.push(userSelect);
//			}
//		}
//		setUsersCoords(tmp);
//	}

	
//	const Map = ReactMapboxGl({
//		accessToken: apiKey,
//	});

//	useEffect(() => {
//		getUsersSelected();
//		// eslint-disable-next-line
//	}, [])

//	if (!usersCoords) {
//		return (<></>);
//	}

//	return (
//		<div className={s.container}>
//			<Map
//				style="mapbox://styles/mapbox/streets-v9"
//				containerStyle={{
//					height: '100%',
//					width: '100%'
//				}}
//				center={[2.3037096141447364, 46.90854262113237]}
//				zoom={[5]}
//			>
//				{usersCoords.map((user: any) => {
//					return (
//						<React.Fragment key={user.id}>
//							<Marker
//								coordinates={[user.longitude, user.latitude]}
//								onClick={() => navigate(`/profile/${user.id}`)}
//							>
//								<img className={s.imgUser} src={`data:image/jpeg;base64,${user.mainPhoto}`}></img>
//							</Marker>
//						</React.Fragment>
//					)
//				})}
//			</Map>
//		</div>
//	);
//}
