import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { NotificationsList } from '../NotificationsList/NotificationsList';
import React from 'react';
import s from './style.module.css'

export function Notifications() {

	const selector = useSelector((store: RootState) => store.user.user);
	if (!selector.notifications) {
		return (<></>);
	}

	return (
		<>
			{selector.notifications.map((notif: any, index: number) => {
				if (!notif.user_source_id || !notif.id) {
					return (<React.Fragment key={index}></React.Fragment>);
				}
				return (
					// <React.Fragment key={notif.id}>
					<div key={index}>
						<NotificationsList notif={notif} />
					</div>
					// </React.Fragment>
				);
			})}
		</>
	);
}