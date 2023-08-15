import React, { useEffect, useState } from 'react';
import { PageButton } from '../../components/PageButton/PageButton';
import { LargeCardUser } from '../../components/LargeCardUser/LargeCardUser';
import { useDispatch } from 'react-redux';
import { saveSection } from '../../store/user/user-slice';
import { getToken } from '../../utils/auth';
import { BackApi } from '../../api/back';
import { SmallCardUser } from '../../components/SmallCardUser/SmallCardUser';
import s from './style.module.css'

const tmp = [
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
	{
		id_user_source: 1000,
		id_user_target: 498
	},
]

export function History() {
	const dispatch = useDispatch();
	const [history, setHistory] = useState<any>(null);

	async function getHistory() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.getHistory(token);
			setHistory(rep.data);
		}
	}

	useEffect(() => {
		dispatch(saveSection('History'));
		getHistory()
	}, [])

	if (!history) {
		return (<></>);
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