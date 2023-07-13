import { FormEvent, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import { SelectPhoto } from '../../components/SelectPhoto/SelectPhoto';
import logo from '../../assets/signupQuestions/photo.png'
import s from './style.module.css'

export function MainPhoto() {
	const navigate = useNavigate();
	const [photo, setPhoto] = useState<any>(null);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(photo);
		navigate('/additionalsPhoto');
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