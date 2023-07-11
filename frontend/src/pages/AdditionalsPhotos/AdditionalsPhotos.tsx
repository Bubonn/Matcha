import { FormEvent, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/photo.png';
import { SelectPhoto } from '../../components/SelectPhoto/SelectPhoto';
import styles from './style.module.css';

export function AdditionalsPhotos() {
	const navigate = useNavigate();
	const [photos, setPhotos] = useState<Array<any>>([]);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		navigate('/signin');
	}

	const handlePhotoSelection = (index: number, file: File) => {
		const updatedPhotos = [...photos];
		updatedPhotos[index] = file;
		setPhotos(updatedPhotos);
	};

	const handleRemovePhoto = (index: number) => {
		const updatedPhotos = [...photos];
		updatedPhotos[index] = null;
		setPhotos(updatedPhotos);
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
