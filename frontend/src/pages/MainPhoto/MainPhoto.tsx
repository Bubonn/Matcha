import { FormEvent, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import { SelectPhoto } from '../../components/SelectPhoto/SelectPhoto';
import logo from '../../assets/signupQuestions/photo.png'
import s from './style.module.css'
import { BackApi } from '../../api/back';

export function MainPhoto() {
	const navigate = useNavigate();
	const [photo, setPhoto] = useState<any>(null);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!photo) {
			return;
		}

		try {
			const formData: any = new FormData();
			formData.append('photo_profil', photo);
			// if (e.target.files)
			// formData.append('photo_profil', photo);
			console.log(formData);
			const response = await fetch('http://localhost:3000/uploads/1', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				console.log('React ok');
			} else {
				console.log('React nop');
			}
		} catch (error) {
			console.error('Une erreur est survenue lors de la requête au backend :', error);
		}
	}

	const handlePhotoSelection = (file: File) => {
		setPhoto(file);
	};

	const handleRemovePhoto = () => {
		setPhoto(null);
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