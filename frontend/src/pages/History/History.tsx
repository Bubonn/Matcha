import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveSection } from '../../store/user/user-slice';
import { getToken } from '../../utils/auth';
import { BackApi } from '../../api/back';
import { SmallCardUser } from '../../components/SmallCardUser/SmallCardUser';
import s from './style.module.css'

export function History() {
	const dispatch = useDispatch();
	const [history, setHistory] = useState<any>(null);

	async function getHistory() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.getHistory(token);
			const reversedHistory = rep.data.reverse();
			setHistory(reversedHistory);
		}
	}

	useEffect(() => {
		dispatch(saveSection('History'));
		getHistory()
		// eslint-disable-next-line
	}, [])

	if (!history) {
		return (<></>);
	}

	if (history.length === 0) {
		return (
			<div className={s.container}>
				<div className={s.containerAnyHistory}>
					<span className={s.text}>You haven't had any visitors yet</span>
				</div>
			</div>
		);
	}

	return (
		<div className={s.container}>
			<div className={s.users}>
			{history.map((userHistory: any, index: number) => {
					return (
					<React.Fragment key={index}>
						<SmallCardUser likeInfo={userHistory}/>
					</React.Fragment>

					);
				})}
			</div>
		</div>
	);
}