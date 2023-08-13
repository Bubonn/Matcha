import { useEffect, useState } from 'react';
import { SideMenu } from '../../components/SideMenu/SideMenu';
import { Header } from '../../components/Header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getCookieByName, getToken } from '../../utils/auth';
import { BackApi } from '../../api/back';
import { useDispatch } from 'react-redux';
import { saveAvatar, saveFirstName, saveId, saveNotifMessages, saveNotifications, saveSection } from '../../store/user/user-slice';
import { Api } from '../../api/api';
import { getSocket, initSocket } from '../../utils/socket';
import s from './style.module.css'

export function Apps() {

	const navigate = useNavigate();
	const selector = useSelector((store: RootState) => store.user.user);
	const dispatch = useDispatch();
	const [verified, setVerified] = useState(false);
	const [socket, setSocket] = useState<any>(null);

	function updateSection (newSection: string){
		dispatch(saveSection(newSection));
	};

	async function checkToken() {
		const token: string | null = getCookieByName('token');
		if (!token) {
			navigate('/signin');
		}
		else {
			const rep = await BackApi.checkToken(token);
			if (rep.status !== 200) {
				navigate('/signin');
			}
			if (selector.id === 0) {
				dispatch(saveId(rep.data.userId));
			}
		}
	}

	async function getInfoUser() {
		const token = getToken();
		if (token) {
			const response = await BackApi.getUserById(selector.id, token);
			dispatch(saveAvatar(response.data.mainPhoto));
			dispatch(saveFirstName(response.data.firstName));
			if (!response.data.verified) {
				navigate('/verifyAccount');
			} else {
				setVerified(true);
				if (!response.data.location) {
					await getUserLocation();
				}
			}
		} else {
			navigate('/signin');
		}
	}

	function geoLocation() {
		return new Promise((resolve, reject) => {
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const latitude = position.coords.latitude;
						const longitude = position.coords.longitude;
						resolve({ latitude, longitude });
					},
					(error) => {
						reject(new Error("Error obtaining location: " + error.message));
					}
				);
			} else {
				reject(new Error("Geolocation is not available in this browser."));
			}
		});
	}

	async function getUserLocation() {
		let location;
		try {
			const response: any = await geoLocation();
			location = response.latitude + ',' + response.longitude;
		} catch (error) {
			try {
				const rep = await Api.getIpInfo();
				location = rep.data.loc;
			} catch (ipError: any) {
				console.error('Error retrieving IP-based information:', ipError.message);
			}
		}
		const token = getToken();
		if (token) {
			await BackApi.updateLocation(token, location);
		} else {
			navigate('/signin');
		}
	}

	async function messageReceived(message: any) {
		if (message.sender_id === selector.id) {
			return;
		}
		const existingMessages = selector.notifMessages;
		const updatedMessages = [...existingMessages, message];
		dispatch(saveNotifMessages(updatedMessages));
		const token = getToken();
		if (token) {
			const rep = await BackApi.updateNotificationsMessages(token, updatedMessages);
		}
	}

	async function getNotifications() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.getNotificationsMessages(token);
			dispatch(saveNotifMessages(rep.data))
			const response = await BackApi.getNotifications(token);
			dispatch(saveNotifications(response.data))
		}
	}

	useEffect(() => {
		checkToken();
		if (selector.id !== 0) {
			getInfoUser();
		}
		// eslint-disable-next-line
	}, [selector.section, selector.id])

	useEffect(() => {
		if (selector.id !== 0) {
			getNotifications();
		}
		// eslint-disable-next-line
	}, [selector.id])
	
	useEffect(() => {
		if (selector.id) {
			const sock: any = getSocket();
			setSocket(sock);
			console.log(sock);
			sock.emit('userConnect', { userId: selector.id });
			
			return () => {
				sock.emit('userDisconnect', { userId: selector.id });
				// sock.disconnect();
			};
		}
	}, [selector.id]);

	useEffect(() => {
		if (selector.id && socket) {
			socket.on('messageFromServer', messageReceived)
		}
		// eslint-disable-next-line
	}, [socket, selector.id]);

	if (!verified) {
		return (
			<></>
		);
	}

	return (
		<div className={s.app}>
			<SideMenu section={selector.section} updateSection={updateSection} />
			<div className={s.content}>
				<Header section={selector.section} />
				<Outlet />
			</div>
		</div>
	);
}
