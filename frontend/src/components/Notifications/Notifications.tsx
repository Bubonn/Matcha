import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { NotificationsList } from '../NotificationsList/NotificationsList';
import React, { useEffect, useState } from 'react';
import s from './style.module.css'

export function Notifications() {

	const selector = useSelector((store: RootState) => store.user.user);
	const [notifs, setNotifs] = useState<any>(null);

	useEffect(() => {
		setNotifs(selector.notifications.slice().reverse());
	}, [selector.notifications])

	if (!selector.notifications || !notifs) {
		return (<></>);
	}

	return (
		<>
			{notifs.map((notif: any, index: number) => {
				return (
					<div key={index}>
						<NotificationsList notif={notif} />
					</div>
				);
			})}
		</>
	);
}