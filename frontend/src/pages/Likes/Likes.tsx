import { useState } from 'react';
import { SmallCardUser } from '../../components/SmallCardUser/SmallCardUser';
import { PageButton } from '../../components/PageButton/PageButton';
import s from './style.module.css'

export function Likes() {
	const [choice, setChoice] = useState<string>('Users who liked me');

	const changeChoice = (newChoice: string) => {
		setChoice(newChoice);
	}

	return (
		<div className={s.container}>
			<div className={s.choice}>
				<PageButton name={"Users who liked me"} selected={choice === 'Users who liked me'} changeChoice={changeChoice}/>
				<PageButton name={"Users I've liked"} selected={choice === "Users I've liked"} changeChoice={changeChoice}/>
			</div>
			<div className={s.users}>
				<SmallCardUser />
				<SmallCardUser />
				<SmallCardUser />
				<SmallCardUser />
				<SmallCardUser />
				<SmallCardUser />
				<SmallCardUser />
				<SmallCardUser />
				<SmallCardUser />
				<SmallCardUser />
			</div>
		</div>
	);
}