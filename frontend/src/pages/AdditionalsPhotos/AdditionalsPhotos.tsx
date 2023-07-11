import { FormEvent, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/photo.png'
import { SelectPhoto } from '../../components/SelectPhoto/SelectPhoto';
import s from './style.module.css'

export function AdditionalsPhotos() {
	const navigate = useNavigate();
	const [photo0, setPhoto0] = useState<any>(null);
	const [photo1, setPhoto1] = useState<any>(null);
	const [photo2, setPhoto2] = useState<any>(null);
	const [photo3, setPhoto3] = useState<any>(null);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		navigate('/signin');
	}

	const handlePhotoSelection = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const file: File | null = e.target.files && e.target.files[0];
		if (file) {
			if (index === 0)
				setPhoto0(file);
			if (index === 1)
				setPhoto1(file);
			if (index === 2)
				setPhoto2(file);
			if (index === 3)
				setPhoto3(file);
		}
	}

	return (
		<div className={s.container}>
			<div className={s.box}>
				<div className={s.logo}>
					<img className={s.image} src={logo} alt='comma' />
				</div>
				<div className={s.description}>
					<p>You can add 4 additional photos</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className={s.interest}>
						<SelectPhoto
							photo={photo0}
							setPhoto={setPhoto0}
							handlePhotoSelection={(e: React.ChangeEvent<HTMLInputElement>) => handlePhotoSelection(0, e)}
						/>
						<SelectPhoto
							photo={photo1}
							setPhoto={setPhoto1}
							handlePhotoSelection={(e: React.ChangeEvent<HTMLInputElement>) => handlePhotoSelection(1, e)}
						/>
						<SelectPhoto
							photo={photo2}
							setPhoto={setPhoto2}
							handlePhotoSelection={(e: React.ChangeEvent<HTMLInputElement>) => handlePhotoSelection(2, e)}
						/>
						<SelectPhoto
							photo={photo3}
							setPhoto={setPhoto3}
							handlePhotoSelection={(e: React.ChangeEvent<HTMLInputElement>) => handlePhotoSelection(3, e)}
						/>
					</div>
					<div className={s.button}>
						<ButtonNext />
					</div>
				</form>
			</div>
		</div>
	);
}
