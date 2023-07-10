// import { FormEvent, useState } from 'react';
// import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
// import { useNavigate } from 'react-router-dom';
// import logo from '../../assets/photo.png'
// import { SelectPhoto } from '../../components/SelectPhoto/SelectPhoto';
// import s from './style.module.css'

// export function AdditionalsPhotos() {
// 	const navigate = useNavigate();
// 	const [photo1, setPhoto1] = useState<any>(null);
// 	const [photo2, setPhoto2] = useState<any>(null);
// 	const [photo3, setPhoto3] = useState<any>(null);
// 	const [photo4, setPhoto4] = useState<any>(null);

// 	function handleSubmit(e: FormEvent<HTMLFormElement>) {
// 		e.preventDefault();
// 		navigate('/signin');
// 	}


// 	const handlePhotoSelection1 = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const file: File | null = e.target.files && e.target.files[0];
// 		setPhoto1(file);
// 	};

// 	const handlePhotoSelection2 = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const file: File | null = e.target.files && e.target.files[1];
// 		setPhoto2(file);
// 	};

// 	const handlePhotoSelection3 = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const file: File | null = e.target.files && e.target.files[2];
// 		setPhoto3(file);
// 	};

// 	const handlePhotoSelection4 = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const file: File | null = e.target.files && e.target.files[3];
// 		setPhoto4(file);
// 	};

// 	return (
// 		<div className={s.container}>
// 			<div className={s.box}>
// 				<div className={s.logo}>
// 					<img className={s.image} src={logo} alt='comma'/>
// 				</div>
// 				<div className={s.description}>
// 					<p>You can add 4 additional photos</p>
// 				</div>
// 				<form onSubmit={handleSubmit}>
// 					<div className={s.interest}>
// 						<SelectPhoto
// 							photo={photo1}
// 							handlePhotoSelection={handlePhotoSelection1}
// 						/>
// 						<SelectPhoto
// 							photo={photo2}
// 							handlePhotoSelection={handlePhotoSelection2}
// 						/>
// 						<SelectPhoto
// 							photo={photo3}
// 							handlePhotoSelection={handlePhotoSelection3}
// 						/>
// 						<SelectPhoto
// 							photo={photo4}
// 							handlePhotoSelection={handlePhotoSelection4}
// 						/>
// 					</div>
// 					<div className={s.button}>
// 						<ButtonNext />
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// }

import { FormEvent, useState } from 'react';
import { ButtonNext } from '../../components/ButtonNext/ButtonNext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/photo.png'
import { SelectPhoto } from '../../components/SelectPhoto/SelectPhoto';
import s from './style.module.css'

export function AdditionalsPhotos() {
	const navigate = useNavigate();
	const [photos, setPhotos] = useState<any[]>([null, null, null, null]);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		navigate('/signin');
	}

	const handlePhotoSelection = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const file: File | null = e.target.files && e.target.files[0];
		setPhotos((prevPhotos) => {
			const updatedPhotos = [...prevPhotos];
			updatedPhotos[index] = file;
			return updatedPhotos;
		});
	};

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
						{photos.map((photo, index) => (
							<SelectPhoto
								key={index}
								photo={photo}
								handlePhotoSelection={(e: React.ChangeEvent<HTMLInputElement>) => handlePhotoSelection(index, e)}
							/>
						))}
					</div>
					<div className={s.button}>
						<ButtonNext />
					</div>
				</form>
			</div>
		</div>
	);
}
