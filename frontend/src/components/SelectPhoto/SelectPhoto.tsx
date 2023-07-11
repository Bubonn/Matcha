import cross from '../../assets/crossPhoto.svg'
import logo from '../../assets/test.svg'
import s from './style.module.css'

interface SelectPhotoProps {
	photo: any;
	setPhoto: any;
	handlePhotoSelection: any;
	// index?: any;
}

export function SelectPhoto({ photo, setPhoto, handlePhotoSelection }: SelectPhotoProps) {

	const uniqueId = `photo-input-${Math.random().toString(36).substring(2, 11)}`;

	function handleRemovePhoto() {
		// if (index === null) {
			setPhoto(null);
		// }
		// else {
			// const photosCopy = Array.from(photo);
			// photosCopy[index] = null;
			// setPhoto(photosCopy);
			// const photosCopy = Array.from(photo);
			// photosCopy[index] = null;
			// const filteredPhotos = photosCopy.filter((item) => item !== null && item !== undefined);
			// setPhoto(filteredPhotos);
		// 	const photosCopy = Array.from(photo);
		// 	photosCopy[index] = null;
		// 	const filteredPhotos = photosCopy.map(item => (item === '<1 empty slot>' ? null : item));
		// 	setPhoto(filteredPhotos);
		// }
	}

	return (
		<div className={s.box}>
			<div
				className={s.container}
				style={{
					backgroundColor: photo ? 'transparent' : 'white'
				}}
				onClick={() => {
					const fileInput = document.getElementById(uniqueId);
					if (fileInput) {
						fileInput.click();
					}
				}}
				>
				{photo ? (
					<img
						className={s.image}
						src={URL.createObjectURL(photo)}
						alt="SelectedPhoto"
					/>
					) : (
					<img className={s.logo} src={logo} alt='cross' />
				)}
			</div>
			{photo && <img className={s.remove} src={cross} onClick={handleRemovePhoto} alt='cross' />}
			<input
				id={uniqueId}
				type="file"
				accept="image/*"
				style={{ display: 'none' }}
				onChange={handlePhotoSelection}
			/>
		</div>
	);
}