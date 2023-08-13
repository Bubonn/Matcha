import { useEffect, useState } from 'react';
import s from './style.module.css'
import { getToken } from '../../utils/auth';
import { BackApi } from '../../api/back';

interface BlockedUserListProps {
	idUser: number;
	blockList: any;
	setBlockList: any;
}

export function BlockedUserList({ idUser, blockList, setBlockList }: BlockedUserListProps) {

	const [user, setUser] = useState<any>(null);
	const [mouseOn, setMouseOn] = useState<boolean>(false);

	async function getInfosUser() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.getUserById(idUser, token);
			if (rep.status === 200) {
				setUser(rep.data);
			}
		}
	}

	async function delBlockUser() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.delBlockUser(token, user.id);
			if (rep.status === 200) {
				const newBlockList = blockList.filter((item: any) => item.id_user_target !== user.id);
				setBlockList(newBlockList);
			}
		}
	}

	useEffect(() => {
		getInfosUser();
		// eslint-disable-next-line
	}, [])

	if (!user) {
		return (<></>);
	}

	return (
		<div
			className={s.container}
			onMouseEnter={() => setMouseOn(true)}
			onMouseLeave={() => setMouseOn(false)}
			onClick={delBlockUser}
		>
			<img className={s.image} src={`data:image/jpeg;base64,${user.mainPhoto}`} alt='ProfileImage' />
			<span
				className={s.text}
				style={{
					visibility: mouseOn ? 'visible' : 'hidden'
				}}
			>
				Unblock
			</span>
		</div>
	);
}