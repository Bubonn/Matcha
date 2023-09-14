import { FormEvent, useEffect, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import { SelectPhoto } from '../../components/SelectPhoto/SelectPhoto';
import { BackApi } from '../../api/back';
import { getCookieByName } from '../../utils/auth';
import logo from '../../assets/signupQuestions/photo.png'
import s from './style.module.css'

export function MainPhoto() {
	const navigate = useNavigate();
	const [photo, setPhoto] = useState<any>(null);
	const [err, setErr] = useState<null | string>(null);
	const [entrenceAnimation, setEntrenceAnimation] = useState(false);
	const [endAnimation, setEndAnimation] = useState(false);
	const [className, setClassName] = useState(s.boxStart);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!photo) {
			return;
		}
		setEndAnimation(true);
		setTimeout(() => {
			return navigate('/additionalsPhoto');
		}, 700);
	}

	async function handlePhotoSelection(file: File) {
		if (!file) {
			return;
		}
		try {
			const formData: any = new FormData();
			formData.append('photo_profil', file);
			formData.append('photoId', 1);

			const token = getCookieByName('token');
			if (token) {
				const rep = await BackApi.upload(token, formData);
				if (rep.status === 200) {
					setPhoto(file);
					setErr(null);
				} else {
					setErr(rep.data);
				}
			}
		} catch (error) {
			console.error('Une erreur est survenue lors de la requête au backend :', error);
		}
	}

	async function handleRemovePhoto() {
		setPhoto(null);
		try {
			const token = getCookieByName('token');
			if (token) {
				await BackApi.removePhoto(1, token);
			}
		} catch (error) {
			console.error('Une erreur est survenue lors de la requête au backend :', error);
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
					<img className={s.image} src={logo} alt='comma'/>
				</div>
				<div className={s.description}>
					<p>Add a main photo</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className={s.interest}>
						<SelectPhoto
							photo={photo}
							handlePhotoSelection={(file: File) => handlePhotoSelection(file)}
							handleRemovePhoto={() => handleRemovePhoto()}
						/>
					</div>
					{err && <span className={s.error}>{err}</span>}
					<div className={s.button}>
						<ButtonNext disabled={photo === null}/>
					</div>
				</form>
			</div>
		</div>
	);
}