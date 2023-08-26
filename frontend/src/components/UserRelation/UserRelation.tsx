import { useEffect } from 'react';
import s from './style.module.css'
import { BackApi } from '../../api/back';
import { getToken } from '../../utils/auth';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export function UserRelation({ id, relation, setRelation }: { id: any, relation: any, setRelation: any }) {

	const selector = useSelector((store: RootState) => store.user.user);

	async function getRelation() {
		const token = getToken();
		if (token) {
			const userRelation = await BackApi.getRelation(token, id);
			if (userRelation.status === 200) {
				if (userRelation.data.length === 2) {
					setRelation('You have matched with this user');
				} else if (userRelation.data.length === 1 && userRelation.data[0].id_user_source === selector.id) {
					setRelation('You like this user');
				} else if (userRelation.data.length === 1) {
					setRelation('This user has liked you');
				}
			}
		}
	}

	useEffect(() => {
		getRelation();
		// eslint-disable-next-line
	}, [relation])

	if (!relation || relation === 'refresh like' || relation === 'refresh dislike') {
		return (<></>);
	}

	const len = (relation.length) * 7;

	return (
		<div
			className={s.container}
			style={{width: `${len}px`}}
		>
			{relation}
		</div>
	);
}

