import { FormEvent, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import { Interest } from '../../components/Interest/Interest';
import logo from '../../assets/interest.png'
import s from './style.module.css'

export function Interests() {
	const navigate = useNavigate();
	const [interests, setInterests] = useState<string[]>([]);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(interests);
		navigate('/mainPhoto');
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
						<Interest interests={interests} setInterests={setInterests}/>
					</div>
					<div className={s.button}>
						<ButtonNext disabled={interests.length === 0}/>
					</div>
				</form>
			</div>
		</div>
	);
}