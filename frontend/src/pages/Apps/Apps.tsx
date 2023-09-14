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
import { getSocket } from '../../utils/socket';
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
			return navigate('/signin');
		}
		else {
			const rep = await BackApi.checkToken(token);
			if (rep.status !== 200) {
				return navigate('/signin');
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
				return navigate('/verifyAccount');
			} else {
				setVerified(true);
			}
		} else {
			return navigate('/signin');
		}

		const currentPath = window.location.pathname;
		if (currentPath === '/') {
			return navigate('/settings');
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
			await BackApi.updateNotificationsMessages(token, updatedMessages);
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
			sock.emit('userConnect', { userId: selector.id });
			
			return () => {
				sock.emit('userDisconnect', { userId: selector.id });
				// sock.disconnect();
			};
		}
	}, [selector.id]);

	useEffect(() => {
		// if (selector.id && socket && selector.notifMessages) {
		if (selector.id && socket && selector.notifMessages) {
			socket.on('messageFromServer', messageReceived);

			return () => {
				socket.off('messageFromServer');
			};
		}

		// eslint-disable-next-line
	}, [socket, selector.notifMessages]);

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
