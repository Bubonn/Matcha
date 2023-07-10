import { FormEvent, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/gender.png'
import s from './style.module.css'
import { ButtonChoice } from '../../components/ButtonChoice/ButtonChoice';

export function Gender() {

	const navigate = useNavigate();
	const [choice, setChoice] = useState<null | string>(null);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const emailValue = formData.get("username") as string;
		// console.log(choice);
		console.log('OK');
		// navigate('/age');
	}

	return (
		<div className={s.container}>
			<div className={s.box}>
				<div className={s.logo}>
					<img src={logo} alt='calendar'/>
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