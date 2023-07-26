import { FormEvent, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import { ButtonChoice } from '../../components/ButtonChoice/ButtonChoice';
import logo from '../../assets/signupQuestions/gender.png'
import s from './style.module.css'
import { BackApi } from '../../api/back';
import { getCookieByName } from '../../utils/auth';

export function Gender() {

	const navigate = useNavigate();
	const [choice, setChoice] = useState<null | string>(null);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// console.log(choice);
		const token = getCookieByName('token');
		if (token && choice) {
			const response = await BackApi.updateGender(token, choice);
			if (response.status === 200) {
				navigate('/preference');
			}
		}
	}

	return (
		<div className={s.container}>
			<div className={s.box}>
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