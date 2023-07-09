import { FormEvent } from 'react';
import logo from '../../assets/calendar.png'
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import s from './style.module.css'
import { useNavigate } from 'react-router-dom';

export function Age() {

	const navigate = useNavigate();

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const emailValue = formData.get("username") as string;
		console.log(emailValue);
		// navigate('/age');
	}

	return (
		<div className={s.container}>
			<div className={s.box}>
				<div className={s.logo}>
					<img src={logo} alt='calendar'/>
				</div>
				<div className={s.description}>
					<p>Your date of birth</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div>
						<input className={s.input} name='day' placeholder='Day'></input>
						<input className={s.input} name='mounth' placeholder='Mounth'></input>
						<input className={s.input} name='year' placeholder='Year'></input>
					</div>
					<div className={s.button}>
						<ButtonNext />
					</div>
				</form>
			</div>
		</div>
	);
}