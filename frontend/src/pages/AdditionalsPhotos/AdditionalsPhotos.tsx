import { FormEvent, useEffect, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import { SelectPhoto } from '../../components/SelectPhoto/SelectPhoto';
import { BackApi } from '../../api/back';
import { getCookieByName } from '../../utils/auth';
import logo from '../../assets/signupQuestions/photo.png';
import s from './style.module.css';

export function AdditionalsPhotos() {
	const navigate = useNavigate();
	const [photos, setPhotos] = useState<Array<any>>([]);
	const [err, setErr] = useState<null | string>(null);
	const [entrenceAnimation, setEntrenceAnimation] = useState(false);
	const [endAnimation, setEndAnimation] = useState(false);
	const [className, setClassName] = useState(s.boxStart);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const token = getCookieByName('token');
		if (token) {
			const response = await BackApi.updateAllInfosSet(token);
			if (response.status === 200) {
				setEndAnimation(true);
				setTimeout(() => {
					return navigate('/verifyAccount');
				}, 700);
			}
		}
	}

	async function handlePhotoSelection(index: number, file: File) {
		try {
			const formData: any = new FormData();
			formData.append('photo_profil', file);
			formData.append('photoId', index + 2);

			const token = getCookieByName('token');
			if (token)  {
				const rep = await BackApi.upload(token, formData)
				if (rep.status === 200) {
					const updatedPhotos = [...photos];
					updatedPhotos[index] = file;
					setPhotos(updatedPhotos);
				} else {
					setErr(rep.data);
				}
			}
		} catch (error) {
			console.error('Une erreur est survenue lors de la requête au backend :', error);
		}
	};

	async function handleRemovePhoto(index: number) {
		const updatedPhotos = [...photos];
		updatedPhotos[index] = null;
		setPhotos(updatedPhotos);
		try {
			const token = getCookieByName('token');

			if (token) {
				await BackApi.removePhoto(index + 2, token)
			}
		} catch (error) {
			console.error('Une erreur est survenue lors de la requête au backend :', error);
		}
	};

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
					<img className={s.image} src={logo} alt="comma" />
				</div>
				<div className={s.description}>
					<p>You can add 4 additional photos</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className={s.interest}>
						{Array.from({ length: 4 }, (_, index) => (
							<SelectPhoto
								key={index}
								photo={photos[index]}
								handlePhotoSelection={(file: File) => handlePhotoSelection(index, file)}
								handleRemovePhoto={() => handleRemovePhoto(index)}
							/>
						))}
					</div>
					{err && <span className={s.error}>{err}</span>}
					<div className={s.button}>
						<ButtonNext />
					</div>
				</form>
			</div>
		</div>
	);
}
