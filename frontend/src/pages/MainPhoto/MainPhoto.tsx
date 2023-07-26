import { FormEvent, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import { SelectPhoto } from '../../components/SelectPhoto/SelectPhoto';
import { BackApi } from '../../api/back';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import logo from '../../assets/signupQuestions/photo.png'
import s from './style.module.css'
import { getCookieByName } from '../../utils/auth';

export function MainPhoto() {
	const navigate = useNavigate();
	const selector = useSelector((store: RootState) => store.user.user);
	const [photo, setPhoto] = useState<any>(null);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!photo) {
			return;
		}
		navigate('/additionalsPhoto')
		// try {
		// 	const formData: any = new FormData();
		// 	formData.append('photo_profil', photo);
		// 	formData.append('photoId', 1);
		// 	const response = await BackApi.upload(20, formData)

		// 	if (response.status === 200) {
		// 		console.log('React ok');
		// 	} else {
		// 		console.log('React nop');
		// 	}
		// } catch (error) {
		// 	console.error('Une erreur est survenue lors de la requête au backend :', error);
		// }
	}

	// const handlePhotoSelection = (file: File) => {
	// 	setPhoto(file);
	// };

	async function handlePhotoSelection(file: File) {
		setPhoto(file);
		if (!file) {
			return;
		}
		try {
			const formData: any = new FormData();
			formData.append('photo_profil', file);
			formData.append('photoId', 1);

			const token = getCookieByName('token');
			if (token) {
				const response = await BackApi.upload(token, formData)
				// if (response.status === 200) {
				// 	navigate('/additionalsPhoto');
				// }
			}

			// if (response.status === 200) {
			// 	console.log('React ok');
			// } else {
			// 	console.log('React nop');
			// }
		} catch (error) {
			console.error('Une erreur est survenue lors de la requête au backend :', error);
		}
	}

	async function handleRemovePhoto() {
		setPhoto(null);
		try {
			const token = getCookieByName('token');
			if (token) {
				const response = await BackApi.removePhoto(1, token);

				if (response.status === 200) {
					console.log('React ok');
				} else {
					console.log('React nop');
				}
			}
		} catch (error) {
			console.error('Une erreur est survenue lors de la requête au backend :', error);
		}
	};

	return (
		<div className={s.container}>
			<div className={s.box}>
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
					<div className={s.button}>
						<ButtonNext disabled={photo === null}/>
					</div>
				</form>
			</div>
		</div>
	);
}