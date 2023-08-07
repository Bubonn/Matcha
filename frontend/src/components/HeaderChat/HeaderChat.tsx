import { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';
import s from './style.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { BackApi } from '../../api/back';

const tmp = [
	{
		conversation_id: 5,
		user1_id: 498,
		user2_id: 999,
		creation_date: "2023-08-07 14:31:46",
		last_message_id: 3,
		last_message_sender_id: 999,
		last_message_recipient_id: 498,
		last_message_content: 'Contenu du deuxieme message',
		last_message_timestamp: '2023-08-07 14:38:44'
	}
]

interface HeaderChatProps {
	idConv: any;
}

export function HeaderChat({ idConv }: HeaderChatProps) {

	const [user, setUser] = useState<any>(null);
	const [infoConv, setInfoConv] = useState(null);
	const selector = useSelector((store: RootState) => store.user.user);

	async function getInfosUser() {
		const token = getToken();
		if (token) {
			const id = tmp[0].user1_id === selector.id ? tmp[0].user2_id : tmp[0].user1_id;
			const rep = await BackApi.getUserById(id, token);
			if (rep.status === 200) {
				setUser(rep.data);
			}
		}
	}

	useEffect(() => {
		getInfosUser();
	}, [])

	if (!user) {
		return (<></>);
	}

	return (
		<>
			<div className={s.ctnImg}>
				<img className={s.image} src={`data:image/jpeg;base64,${user.mainPhoto}`} alt='userAvatar' />
			</div>
			<div className={s.infoUser}>
				<span className={s.chatWith}>Chat with</span>
				<span className={s.firstName}>{user.firstName}</span>
			</div>
		</>
	);
}