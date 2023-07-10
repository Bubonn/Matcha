import { FormEvent, useEffect, useRef, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/photo.png'
import s from './style.module.css'
import { SelectPhoto } from '../../components/SelectPhoto/SelectPhoto';

export function MainPhoto() {
	const navigate = useNavigate();
	const [photo, setPhoto] = useState<any>(null);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// const formData = new FormData(e.currentTarget);
		// const emailValue = formData.get("username") as string;
		// console.log(description);
		// console.log('OK');
		navigate('/signin');
	}

	// async function setProfilePicture(e: React.ChangeEvent<HTMLInputElement>) {
	// 	const file = e.target.files?.[0];
	// 	if (file) {
	// 		const reader = new FileReader();
	// 		reader.readAsDataURL(file);
	// 	}
	// }

	const handlePhotoSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file: File | null = e.target.files && e.target.files[0];
		setPhoto(file);
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
							handlePhotoSelection={handlePhotoSelection}
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