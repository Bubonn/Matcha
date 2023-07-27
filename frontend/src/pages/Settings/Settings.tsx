import { useEffect, useState } from 'react';
import { InterestFilter } from '../../components/InterestFilter/InterestFilter';
import { SettingsPreference } from '../../components/SettingsPreference/SettingsPreference';
import { InputSettings } from '../../components/InputSettings/InputSettings';
import { SelectPhotoSetings } from '../../components/SelectPhotoSettings/SelectPhotoSettings';
import { useDispatch } from 'react-redux';
import { saveAvatar, saveSection } from '../../store/user/user-slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { BackApi } from '../../api/back';
import man from '../../assets/settings/man.svg'
import woman from '../../assets/settings/woman.svg'
import bi from '../../assets/settings/bi.svg'
import s from './style.module.css'
import { promisify } from 'util';
import { read } from 'fs';

export function Settings() {
	const [selectedDay, setSelectedDay] = useState('');
	const [selectedMonth, setSelectedMonth] = useState('');
	const [selectedYear, setSelectedYear] = useState('');
	const [preference, setPreference] = useState('');
	const [interests, setInterests] = useState<string[]>([]);
	const [description, setDescription] = useState<string>('');
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confPassword, setConfPassword] = useState<string>('');
	const [photos, setPhotos] = useState<Array<any>>([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const selector = useSelector((store: RootState) => store.user.user);
	const maxChar = 200;

	const days = Array.from(Array(31), (_, index) => index + 1);
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
					'August', 'September', 'October', 'November', 'December'];
	const currentYear = new Date().getFullYear();
	const years = Array.from(Array(100), (_, index) => currentYear - index);

	const handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value;
		if (value.length <= maxChar) {
			setDescription(value);
		} else {
			setDescription(value.slice(0, maxChar));
		}
	};

	async function handlePhotoSelection(index: number, file: File) {
			const reader = new FileReader();
			reader.onload = async () => {
				try {
					const formData: any = new FormData();
					formData.append('photo_profil', file);
					formData.append('photoId', index + 1);

					const token = getToken();
					if (token) {
						const response = await BackApi.upload(token, formData);
						if (response.status === 200) {
							const base64Image = typeof reader.result === 'string' ? reader.result.split(',')[1] : '';
							const updatedPhotos = [...photos];
							updatedPhotos[index] = base64Image;
							setPhotos(updatedPhotos);
							if (index === 0) {
								dispatch(saveAvatar(base64Image));
							}
						} else {
							console.log(response.data);
						}
					}


				} catch (error) {
					console.error('Une erreur est survenue lors de la requête au backend :', error);
				}
			};
			reader.readAsDataURL(file);
	};


	async function handleRemovePhoto(index: number) {
		// const updatedPhotos = [...photos];
		// updatedPhotos[index] = null;
		// setPhotos(updatedPhotos);

		const updatedPhotos = [...photos];
		updatedPhotos[index] = null;
		setPhotos(updatedPhotos);
		try {
			const token = getToken();

			if (token) {
				await BackApi.removePhoto(index + 1, token)
			}
		} catch (error) {
			console.error('Une erreur est survenue lors de la requête au backend :', error);
		}
	};

	function extractDateParts(dateString: string) {
		const date = new Date(dateString);
		const year = date.getFullYear().toString();
		const month = String(date.getMonth() + 1);
		const day = String(date.getDate());
		return { year, month, day };
	}

	async function getInfoUser() {
		const token = getToken();
		if (!token) {
			return navigate('/signin');
		}
		const response = await BackApi.getUserById(selector.id, token);
		if (response.status === 200) {
			const user = response.data;
			console.log('user', user);
			setPreference(user.preference);
			const { year, month, day } = extractDateParts(user.birth);
			setSelectedYear(year);
			setSelectedMonth(month);
			setSelectedDay(day);
			setDescription(user.description);
			setFirstName(user.firstName);
			setLastName(user.lastName);
			setEmail(user.email);
			setUsername(user.username);
			const rep = await BackApi.getPhotoById(selector.id, token);
			setPhotos([rep.data.photo1, rep.data.photo2, rep.data.photo3, rep.data.photo4, rep.data.photo5]);
			// console.log('Api photos', rep.data.photo1);
		}
	}

	useEffect(() => {
		dispatch(saveSection('Settings'));
		if (selector.id !== 0) {
			getInfoUser();
		}
	}, [selector.id])

	if (selector.id === 0) {
		return (<></>);
	}

	console.log('photos', photos);

	return (
		<div className={s.container}>
			<div className={s.userInfo}>
				<div className={s.leftCtn}>
					<div className={s.birth}>
						<span className={s.title}>Date of birth</span>
						<select
							className={s.select}
							name="day"
							value={selectedDay}
							onChange={(e) => setSelectedDay(e.target.value)}
						>
							<option value="">Day</option>
							{days.map((day) => (
								<option key={day} value={day}>
									{day}
								</option>
							))}
						</select>
						<select
							className={s.select}
							name="month"
							value={selectedMonth}
							onChange={(e) => setSelectedMonth(e.target.value)}
						>
							<option value="">Month</option>
							{months.map((month, index) => (
								<option key={index + 1} value={index + 1}>
									{month}
								</option>
							))}
						</select>
						<select
							className={s.select}
							name="year"
							value={selectedYear}
							onChange={(e) => setSelectedYear(e.target.value)}
						>
							<option value="">Year</option>
							{years.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
					</div>
					<div className={s.preference}>
						<span className={s.title}>Preference</span>
						<div className={s.choicePreference}>
							<SettingsPreference name='man' logo={man} isSelected={preference === 'man'} setSelectedPreference={setPreference} />
							<SettingsPreference name='woman' logo={woman} isSelected={preference === 'woman'} setSelectedPreference={setPreference} />
							<SettingsPreference name='both' logo={bi} isSelected={preference === 'both'} setSelectedPreference={setPreference} />
						</div>
					</div>
					<div className={s.description}>
						<span className={s.title}>Description</span>
						<div className={s.textBox}>
							<textarea
								className={s.textAera}
								placeholder='Enter a brief description of yourself...'
								name="description"
								value={description}
								onChange={handleChangeDescription}
							/>
						</div>
						<p className={s.char}>{description?.length}/{maxChar}</p>
					</div>
				</div>
				<div className={s.rightCtn}>
					<div className={s.hobbies}>
						<span className={s.title}>Hobbies</span>
						<div className={s.hobbies}>
							<InterestFilter
								interests={interests}
								setInterests={setInterests}
							/>
						</div>
					</div>
					<div className={s.information}>
						<span className={s.title}>User information</span>
						<div className={s.input}>
							<InputSettings name='firstName' text={true} content={firstName} setContent={setFirstName} placeholder='First name'/>
							<InputSettings name='lastName' text={true} content={lastName} setContent={setLastName} placeholder='Last name'/>
						</div>
						<div className={s.input}>
							<InputSettings name='email' text={true} content={email} setContent={setEmail} placeholder='Email'/>
							<InputSettings name='username' text={true} content={username} setContent={setUsername} placeholder='Username'/>
						</div>
						<div className={s.input}>
							<InputSettings name='password' text={false} content={password} setContent={setPassword} placeholder='New password'/>
							<InputSettings name='confirmPassword' text={false} content={confPassword} setContent={setConfPassword} placeholder='Confirm new password'/>
						</div>
					</div>
				</div>
			</div>
			<div className={s.photos}>
				<span className={s.title}>Photos</span>
				<div className={s.choicePhoto}>
					{Array.from({ length: 5 }, (_, index) => (
						<SelectPhotoSetings
							key={index}
							index={index}
							photo={photos[index]}
							handlePhotoSelection={(file: File) => handlePhotoSelection(index, file)}
							handleRemovePhoto={() => handleRemovePhoto(index)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}