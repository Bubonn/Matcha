import { FormEvent, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/photo.png'
import { SelectPhoto } from '../../components/SelectPhoto/SelectPhoto';
import s from './style.module.css'

export function MainPhoto() {
	const navigate = useNavigate();
	const [photo, setPhoto] = useState<any>(null);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(photo);
		navigate('/additionalsPhoto');
	}

	const handlePhotoSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
		// console.log('test', e.target.files);
		const file: File | null = e.target.files && e.target.files[0];
		if (file) {
			setPhoto(file);
			// const reader = new FileReader();
			// reader.readAsDataURL(file);
			// reader.onload = () => {
				// 	dispatch(setAvatar(reader.result as string));
				// };
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
							setPhoto={setPhoto}
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