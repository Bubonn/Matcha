import React from 'react';
import cross from '../../assets/crossPhoto.svg';
import logo from '../../assets/addPhoto.svg';
import s from './style.module.css';

interface SelectPhotoSetingsProps {
	photo: File | null;
	handlePhotoSelection: (file: File) => void;
	handleRemovePhoto: () => void;
	index: number;
}

export function SelectPhotoSetings({ photo, handlePhotoSelection, handleRemovePhoto, index }: SelectPhotoSetingsProps) {
	const uniqueId = React.useRef(`photo-input-${Math.random().toString(36).substring(2, 11)}`);

	const handleClick = () => {
		const fileInput = document.getElementById(uniqueId.current);
		if (fileInput) {
			fileInput.click();
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file: File | null = e.target.files && e.target.files[0];
		if (file) {
			handlePhotoSelection(file);
		}
	};

	return (
		<div className={s.box}>
			<div
				className={`${s.container} ${photo ? '' : s.empty}`}
				onClick={handleClick}
			>
				{photo ? (
					<img className={s.image} src={`data:image/jpeg;base64,${photo}`} alt='userAvatar' />
				) : (
					<img className={s.logo} src={logo} alt="cross" />
				)}
			</div>
			{photo && index !== 0 && (
				<img className={s.remove} src={cross} onClick={handleRemovePhoto} alt="cross" />
			)}
			<input
				id={uniqueId.current}
				type="file"
				accept="image/*"
				style={{ display: 'none' }}
				onChange={handleInputChange}
			/>
		</div>
	);
}