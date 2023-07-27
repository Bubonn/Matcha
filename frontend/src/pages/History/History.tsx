import { useEffect, useState } from 'react';
import { PageButton } from '../../components/PageButton/PageButton';
import s from './style.module.css'
import { LargeCardUser } from '../../components/LargeCardUser/LargeCardUser';
import { useDispatch } from 'react-redux';
import { saveSection } from '../../store/user/user-slice';

export function History() {
	const [choice, setChoice] = useState<string>('Visitors');
	const dispatch = useDispatch();

	const changeChoice = (newChoice: string) => {
		setChoice(newChoice);
	}

	useEffect(() => {
		dispatch(saveSection('History'));
	}, [])

	return (
		<div className={s.container}>
			<div className={s.choice}>
				<PageButton name={"Visitors"} selected={choice === 'Visitors'} changeChoice={changeChoice}/>
				<PageButton name={"Visited profiles"} selected={choice === "Visited profiles"} changeChoice={changeChoice}/>
			</div>
			<div className={s.users}>
				<LargeCardUser />
				<LargeCardUser />
				<LargeCardUser />
				<LargeCardUser />
				<LargeCardUser />
				<LargeCardUser />
				<LargeCardUser />
				<LargeCardUser />
				<LargeCardUser />
				<LargeCardUser />
				<LargeCardUser />
				<LargeCardUser />
				<LargeCardUser />
				<LargeCardUser />
			</div>
		</div>
	);
}