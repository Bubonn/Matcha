import { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';
import s from './style.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { BackApi } from '../../api/back';
import { useNavigate } from 'react-router-dom';

interface HeaderChatProps {
	idConv: any;
}

export function HeaderChat({ idConv }: HeaderChatProps) {

	const [user, setUser] = useState<any>(null);
	const selector = useSelector((store: RootState) => store.user.user);
	const navigate = useNavigate();

	async function getInfosUser() {
		if (idConv) {
			const token = getToken();
			if (token) {
				const response = await BackApi.getConversationById(token, idConv);
				const conv = response.data;
				const id = conv.user1_id === selector.id ? conv.user2_id : conv.user1_id;
				const rep = await BackApi.getUserById(id, token);
				if (rep.status === 200) {
					setUser(rep.data);
				}
			}
		}
	}

	useEffect(() => {
		getInfosUser();
		// eslint-disable-next-line
	}, [idConv])

	if (!user || !idConv) {
		return (<></>);
	}

	return (
		<div className={s.container} onClick={() => navigate(`/profile/${user.id}`)}>
			<div className={s.ctnImg}>
				<img className={s.image} src={`data:image/jpeg;base64,${user.mainPhoto}`} alt='userAvatar' />
			</div>
			<div className={s.infoUser}>
				<span className={s.chatWith}>Chat with</span>
				<span className={s.firstName}>{user.firstName}</span>
			</div>
		</div>
	);
}