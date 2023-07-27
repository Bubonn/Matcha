import { FormEvent, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import { SelectPhoto } from '../../components/SelectPhoto/SelectPhoto';
import logo from '../../assets/signupQuestions/photo.png';
import styles from './style.module.css';
import { BackApi } from '../../api/back';
import { getCookieByName } from '../../utils/auth';

export function AdditionalsPhotos() {
	const navigate = useNavigate();
	const [photos, setPhotos] = useState<Array<any>>([]);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const token = getCookieByName('token');
		if (token) {
			const response = await BackApi.updateAllInfosSet(token);
			if (response.status === 200) {
				navigate('/search');
			}
		}
	}

	async function handlePhotoSelection(index: number, file: File) {
		const updatedPhotos = [...photos];
		updatedPhotos[index] = file;
		setPhotos(updatedPhotos);
		try {
			const formData: any = new FormData();
			formData.append('photo_profil', file);
			formData.append('photoId', index + 2);

			const token = getCookieByName('token');

			if (token)  {
				await BackApi.upload(token, formData)
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

	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<div className={styles.logo}>
					<img className={styles.image} src={logo} alt="comma" />
				</div>
				<div className={styles.description}>
					<p>You can add 4 additional photos</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className={styles.interest}>
						{Array.from({ length: 4 }, (_, index) => (
							<SelectPhoto
								key={index}
								photo={photos[index]}
								handlePhotoSelection={(file: File) => handlePhotoSelection(index, file)}
								handleRemovePhoto={() => handleRemovePhoto(index)}
							/>
						))}
					</div>
					<div className={styles.button}>
						<ButtonNext />
					</div>
				</form>
			</div>
		</div>
	);
}
