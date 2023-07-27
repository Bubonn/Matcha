import { useEffect, useState } from 'react';
import { SmallCardUser } from '../../components/SmallCardUser/SmallCardUser';
import { PageButton } from '../../components/PageButton/PageButton';
import s from './style.module.css'
import { saveSection } from '../../store/user/user-slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export function Likes() {
	const [choice, setChoice] = useState<string>('Users who liked me');
	const dispatch = useDispatch();
	const selector = useSelector((store: RootState) => store.user.user);

	const changeChoice = (newChoice: string) => {
		setChoice(newChoice);
	}

	useEffect(() => {
		dispatch(saveSection('Likes'));
	}, [])

	if (selector.id === 0) {
		return (<></>);
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