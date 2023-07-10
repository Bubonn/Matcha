import { useState } from 'react';
import logo from '../../assets/test.svg'
import s from './style.module.css'

interface SelectPhotoProps {
	photo: any;
	handlePhotoSelection: any;
}

export function SelectPhoto({ photo, handlePhotoSelection }: SelectPhotoProps) {
	return (
		<div>
			<div
				className={s.container}
				style={{
					backgroundColor: photo ? 'transparent' : 'white'
				}}
				onClick={() => {
					const fileInput = document.getElementById('photo-input');
					if (fileInput) {
						fileInput.click();
					}
				}}
			>
				{photo ? (
					<img
						className={s.image}
						src={URL.createObjectURL(photo)}
						alt="Selected Photo"
						style={{ width: '100%', height: '100%' }}
					/>
				) : (
					<img className={s.logo} src={logo} alt='cross' />
				)}
			</div>
			<input
				id="photo-input"
				type="file"
				accept="image/*"
				style={{ display: 'none' }}
				onChange={handlePhotoSelection}
			/>
		</div>
	);
}