import { useState } from 'react';
import { PageButton } from '../../components/PageButton/PageButton';
import s from './style.module.css'
import { LargeCardUser } from '../../components/LargeCardUser/LargeCardUser';

export function History() {
	const [choice, setChoice] = useState<string>('Visitors');

	const changeChoice = (newChoice: string) => {
		setChoice(newChoice);
	}

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