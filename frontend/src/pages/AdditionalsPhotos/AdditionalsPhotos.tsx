import { FormEvent, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import { SelectPhoto } from '../../components/SelectPhoto/SelectPhoto';
import logo from '../../assets/signupQuestions/photo.png';
import styles from './style.module.css';
import { BackApi } from '../../api/back';

export function AdditionalsPhotos() {
	const navigate = useNavigate();
	const [photos, setPhotos] = useState<Array<any>>([]);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		navigate('/signin');
	}

	async function handlePhotoSelection(index: number, file: File) {
		const updatedPhotos = [...photos];
		updatedPhotos[index] = file;
		setPhotos(updatedPhotos);
		try {
			const formData: any = new FormData();
			formData.append('photo_profil', file);
			console.log('INDEX', index + 2);
			formData.append('photoId', index + 2);
			const response = await BackApi.upload(1, formData)

			if (response.status === 200) {
				console.log('React ok');
			} else {
				console.log('React nop');
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
			const response = await BackApi.removePhoto(1, index + 2)

			if (response.status === 200) {
				console.log('React ok');
			} else {
				console.log('React nop');
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
