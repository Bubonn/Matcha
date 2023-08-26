import { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';
import { BackApi } from '../../api/back';
import { useNavigate } from 'react-router-dom';
import s from './style.module.css'

export function NotificationsList({notif}: {notif: any}) {

	const [user, setUser] = useState<any>(null);
	const [message, setMessage] = useState<any>(null);
	const navigate = useNavigate();

	async function getUserInfo() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.getUserById(notif.user_source_id, token);
			if (rep.status === 200) {
				setUser(rep.data);
				if (notif.notification_type === 'like') {
					setMessage(`${rep.data.firstName} liked your profile`);
				} else if (notif.notification_type === 'dislike') {
					setMessage(`${rep.data.firstName} unliked your profile`);
				} else if (notif.notification_type === 'visited') {
					setMessage(`${rep.data.firstName} visited your profile`);
				} else if (notif.notification_type === 'match') {
					setMessage(`You matched with ${rep.data.firstName}`);
				} else {
					setMessage(`Message pas defini`);
				}
			}
		}
	}
	
	useEffect(() => {
		getUserInfo()
		// eslint-disable-next-line
	}, [notif])

	if (!user || !message) {
		return (<></>);
	}

	return (
		<div className={s.container} onClick={() => navigate(`/profile/${user.id}`)}>
			<div className={s.imageCtn}>
				<img className={s.image} src={`data:image/jpeg;base64,${user.mainPhoto}`} alt='photoUser'/>
			</div>
			<div className={s.message}>
				{message}
			</div>
		</div>
	);
}