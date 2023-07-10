import { FormEvent, useEffect, useRef, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/interest.png'
import s from './style.module.css'

export function Interests() {
	const navigate = useNavigate();
	const [description, setDescription] = useState<string>('');

	const interests = ['sport', 'music', 'Travel', 'Movies', 'TV Shows', 'Reading',
					'Cooking', 'Art', 'Fitness', 'Gaming', 'Dancing', 'Technology', 'Photography',
					'Running', 'Pets', 'Pets', 'Nature', 'Sciences', 'Cars', '42']

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const emailValue = formData.get("username") as string;
		console.log(description);
		// console.log('OK');
		// navigate('/age');
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
					{/* <div className={s.textBox}> */}
					{/* </div> */}
					<div className={s.button}>
						<ButtonNext disabled={description.length === 0}/>
					</div>
				</form>
			</div>
		</div>
	);
}