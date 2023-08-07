import { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';
import { BackApi } from '../../api/back';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import notif from '../../assets/notifMessage.svg'
import s from './style.module.css'

interface ConversationsListProps {
	infoConv: any;
	setIdConv: any;
}

export function ConversationsList({ infoConv, setIdConv }: ConversationsListProps) {

	const selector = useSelector((store: RootState) => store.user.user);
	const [user, setUser] = useState<any>(null);


	async function getInfosUser() {
		const token = getToken();
		if (token) {
			const id = infoConv.user1_id === selector.id ? infoConv.user2_id : infoConv.user1_id;
			const rep = await BackApi.getUserById(id, token);
			if (rep.status === 200) {
				setUser(rep.data);
			}
		}
	}

	function getHourLastMessage() {
		const parsedDate = new Date(infoConv.last_message_timestamp);
		const hours = parsedDate.getHours();
		const minutes = parsedDate.getMinutes();
		const timeStr = `${hours}:${minutes}`;
		return timeStr;
	}

	useEffect(() => {
		getInfosUser();
	}, [])

	if (!user) {
		return (<></>);
	}

	return (
		<div className={s.container} onClick={() => setIdConv(infoConv.conversation_id)}>
			<div className={s.ctnPhoto}>
				<img className={s.image} src={`data:image/jpeg;base64,${user.mainPhoto}`} alt='userAvatar' />
			</div>
			<div className={s.ctnInfosUser}>
				<div className={s.innerContent}>
					<span className={s.firstName}>{user.firstName}</span>
				</div>
				<div className={s.innerContent}>
					{infoConv.last_message_content ?
						<span className={s.lastMessage}>{infoConv.last_message_content}</span>
						: <span className={s.lastMessage}>Start the conversation :)</span>
					}
				</div>
			</div>
			<div className={s.ctnTime}>
				{infoConv.last_message_timestamp && <span className={s.hour}>{getHourLastMessage()}</span>}
				{infoConv.last_message_timestamp && <img className={s.notif} src={notif} alt='notif' />}
			</div>
		</div>
	);
}
