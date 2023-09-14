import { FormEvent, useEffect, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import { ButtonChoice } from '../../components/ButtonChoice/ButtonChoice';
import { BackApi } from '../../api/back';
import { getCookieByName } from '../../utils/auth';
import logo from '../../assets/signupQuestions/gender.png'
import s from './style.module.css'

export function Gender() {

	const navigate = useNavigate();
	const [choice, setChoice] = useState<null | string>(null);
	const [entrenceAnimation, setEntrenceAnimation] = useState(false);
	const [endAnimation, setEndAnimation] = useState(false);
	const [className, setClassName] = useState(s.boxStart);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const token = getCookieByName('token');
		if (token && choice) {
			const response = await BackApi.updateGender(token, choice);
			if (response.status === 200) {
				setEndAnimation(true);
				setTimeout(() => {
					return navigate('/preference');
				}, 700);
			}
		}
	}

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setEntrenceAnimation(true);
		}, 50);
		return () => clearTimeout(timeoutId);
	}, []);

	useEffect(() => {
		if (endAnimation) {
			setClassName(s.boxEndAnimate);
		} else if (entrenceAnimation) {
			setClassName(s.boxStartAnimate);
		}
	}, [entrenceAnimation, endAnimation])

	return (
		<div className={s.container}>
			<div className={className}>
				<div className={s.logo}>
					<img src={logo} alt='gender'/>
				</div>
				<div className={s.description}>
					<p>You are...</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className={s.choice}>
						<ButtonChoice name={'A man'} nameSetter={'man'} choice={choice} setChoice={setChoice}/>
						<ButtonChoice name={'A woman'} nameSetter={'woman'} choice={choice} setChoice={setChoice}/>
					</div>
					<div className={s.button}>
						<ButtonNext disabled={choice === null}/>
					</div>
				</form>
			</div>
		</div>
	);
}