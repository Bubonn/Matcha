import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { getSocket } from '../../utils/socket'
import { useDispatch } from 'react-redux'
import { saveNotifications } from '../../store/user/user-slice'
import logo from '../../assets/notification.svg'
import s from './style.module.css'
import { Notifications } from '../Notifications/Notifications'
import { BackApi } from '../../api/back'
import { getToken } from '../../utils/auth'

interface HeaderProps {
	section: string
}

export function Header({ section }: HeaderProps) {

	const dispatch = useDispatch();
	const selector = useSelector((store: RootState) => store.user.user);
	const [showNotif, setShowNotif] = useState<boolean>(false);
	const [noReadNotif, setNoReadNotif] = useState(0);
	const [socket, setSocket] = useState<null | Socket>(null);

	function noReadNotifications() {
		let countFalseRead = 0;

		selector.notifications.forEach((objet: any) => {
			if (!objet.is_read) {
				countFalseRead++;
			}
		});
		setNoReadNotif(countFalseRead);
	}

	function notifReceived(notif: any) {
		const existingNotifications = selector.notifications;
		const updatedNotifications = [...existingNotifications, notif];
		dispatch(saveNotifications(updatedNotifications));
	}

	async function handleClickNotif() {
		setShowNotif(!showNotif);
		const token = getToken();
		if (token) {
			await BackApi.setReadNotifications(token);
			const existingNotifications = selector.notifications;
			const updatedNotifications = existingNotifications.map((notif: any) => {
				return { ...notif, is_read: true };
			});
			dispatch(saveNotifications(updatedNotifications));
		}
	}

	useEffect(() => {
		if (!socket) {
			setSocket(getSocket());
		}
	}, [])

	useEffect(() => {
		if (selector.notifications && socket) {
			socket.on('notifFromServer', notifReceived)

			return () => {
				socket.off('notifFromServer');
			}
		}
		// eslint-disable-next-line
	}, [socket, selector.notifications]);


	useEffect(() => {
		if (selector.notifications) {
			noReadNotifications();
		}
	}, [selector.notifications])

	if (selector.id === 0 || !selector.avatar || !selector.firstName) {
		return (
			<>
			</>
		);
	}

	return (
		<header className={s.header}>
			<div className={s.section}>
				{section}
			</div>
			<div className={s.user}>
				{showNotif && <div className={s.notificationList}><Notifications /></div>}
				<div className={s.notification} onClick={handleClickNotif}>
					<img className={s.logoBell} src={logo} alt='notification'/>
					{noReadNotif > 0 && <div className={s.numberNotif}>{noReadNotif}</div>}
				</div>
				<div className={s.infoUser}>
					<img className={s.logoUser} src={`data:image/jpeg;base64,${selector.avatar}`} alt='userAvatar' />
					<span className={s.firstName}>{selector.firstName}</span>
				</div>
			</div>
		</header>
	);
}