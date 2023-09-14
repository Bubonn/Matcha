import { BackApi } from '../../api/back';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookieByName } from '../../utils/auth';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import logo from '../../assets/signupQuestions/comma.png'
import s from './style.module.css'

export function Description() {
	const navigate = useNavigate();
	const [description, setDescription] = useState<string>('');
	const [entrenceAnimation, setEntrenceAnimation] = useState(false);
	const [endAnimation, setEndAnimation] = useState(false);
	const [className, setClassName] = useState(s.boxStart);
	const maxChar = 200;

	function descriptionIsVoid() {
		const newDescription = removeNewlines(description);
		const newDescriptionBis = removeExtraSpace(newDescription);
		return newDescriptionBis.length === 0;
	}

	function removeNewlines(inputString: string): string {
		const pattern = /[\r\n]+/g;
		return inputString.replace(pattern, " ");
	}

	function removeExtraSpace(str: any) {
		str = str.replace(/[\s]{2,}/g, " ");
		str = str.replace(/^[\s]/, "");
		str = str.replace(/[\s]$/, "");
		return str;
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const token = getCookieByName('token');
		if (token && description) {
			const newDescription = removeNewlines(description);
			const newDescriptionBis = removeExtraSpace(newDescription);
			if (newDescription.length === 0) {
				// return setMsgDescription('Description can\'t be empty');
				return ;
			}
			const response = await BackApi.updateDescripion(token, newDescriptionBis);
			if (response.status === 200) {
				setEndAnimation(true);
				setTimeout(() => {
					return navigate('/interests');
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
			<div className={className}>
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
						<ButtonNext disabled={descriptionIsVoid()}/>
					</div>
				</form>
			</div>
		</div>
	);
}