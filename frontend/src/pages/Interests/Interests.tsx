import { FormEvent, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import { InterestSignup } from '../../components/InterestSignup/InterestSignup';
import { getCookieByName } from '../../utils/auth';
import { BackApi } from '../../api/back';
import logo from '../../assets/signupQuestions/interest.png'
import s from './style.module.css'

export function Interests() {
	const navigate = useNavigate();
	const [interests, setInterests] = useState<number[]>([]);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const token = getCookieByName('token');
		if (token && interests) {
			const response = await BackApi.updateInterests(token, interests);
			if (response.status === 200) {
				navigate('/mainPhoto');
			}
		}
	}

	return (
		<div className={s.container}>
			<div className={s.box}>
				<div className={s.logo}>
					<img className={s.image} src={logo} alt='comma'/>
				</div>
				<div className={s.description}>
					<p>Tell us about your interests</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className={s.interest}>
						<InterestSignup interests={interests} setInterests={setInterests}/>
					</div>
					<div className={s.button}>
						<ButtonNext disabled={interests.length === 0}/>
					</div>
				</form>
			</div>
		</div>
	);
}