import React from 'react';
import cross from '../../assets/crossPhoto.svg';
import logo from '../../assets/addPhoto.svg';
import styles from './style.module.css';

interface SelectPhotoProps {
	photo: File | null;
	handlePhotoSelection: (file: File) => void;
	handleRemovePhoto: () => void;
}

export function SelectPhoto({ photo, handlePhotoSelection, handleRemovePhoto }: SelectPhotoProps) {
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
		<div className={styles.box}>
			<div
				className={`${styles.container} ${photo ? '' : styles.empty}`}
				onClick={handleClick}
			>
				{photo ? (
					<img className={styles.image} src={URL.createObjectURL(photo)} alt="SelectedPhoto" />
				) : (
					<img className={styles.logo} src={logo} alt="cross" />
				)}
			</div>
			{photo && (
				<img className={styles.remove} src={cross} onClick={handleRemovePhoto} alt="cross" />
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
