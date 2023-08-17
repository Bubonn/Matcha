import React, { useEffect, useState } from 'react';
import { SmallCardUser } from '../../components/SmallCardUser/SmallCardUser';
import { PageButton } from '../../components/PageButton/PageButton';
import { saveSection } from '../../store/user/user-slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getToken } from '../../utils/auth';
import { BackApi } from '../../api/back';
import s from './style.module.css'

export function Likes() {
	const [likes, setLikes] = useState<any>(null);
	const dispatch = useDispatch();
	const selector = useSelector((store: RootState) => store.user.user);

	async function getLikes() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.getLikes(token);
			setLikes(rep.data);
		}
	}

	useEffect(() => {
		dispatch(saveSection('Likes'));
		getLikes()
	}, [])

	if (selector.id === 0 || !likes) {
		return (<></>);
	}

	if (likes.length === 0) {
		return (
			<div className={s.container}>
				<div className={s.containerAnyLikes}>
					<span className={s.text}>You haven't received any likes yet</span>
				</div>
			</div>
		);
	}

	return (
		<div className={s.container}>
			<div className={s.users}>
				{likes.map((like: any) => {
					return (
					<React.Fragment key={like.id_user_source}>
						<SmallCardUser likeInfo={like}/>
					</React.Fragment>

					);
				})}
			</div>
		</div>
	);
}