import { FormEvent, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/signupQuestions/comma.png'
import s from './style.module.css'

export function Description() {
	const navigate = useNavigate();
	const [description, setDescription] = useState<string>('');
	const maxChar = 200;

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(description);
		navigate('/interests');
	}

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value;
		if (value.length <= maxChar) {
			setDescription(value);
		} else {
			setDescription(value.slice(0, maxChar));
		}
	};

	return (
		<div className={s.container}>
			<div className={s.box}>
				<div className={s.logo}>
					<img className={s.image} src={logo} alt='comma'/>
					<img className={s.image} src={logo} alt='comma'/>
				</div>
				<div className={s.description}>
					<p>Describe yourself</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className={s.textBox}>
						<textarea
							className={s.textAera}
							placeholder='Enter a brief description of yourself...'
							name="description"
							value={description}
							onChange={handleChange}
						/>
					</div>
					<p className={s.char}>{description?.length}/{maxChar}</p>
					<div className={s.button}>
						<ButtonNext disabled={description.length === 0}/>
					</div>
				</form>
			</div>
		</div>
	);
}