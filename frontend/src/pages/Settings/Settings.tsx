import { useEffect, useState } from 'react';
import { InterestFilter } from '../../components/InterestFilter/InterestFilter';
import { SettingsPreference } from '../../components/SettingsPreference/SettingsPreference';
import { InputSettings } from '../../components/InputSettings/InputSettings';
import { SelectPhotoSetings } from '../../components/SelectPhotoSettings/SelectPhotoSettings';
import { useDispatch } from 'react-redux';
import { saveAvatar, saveFirstName, saveSection } from '../../store/user/user-slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { BackApi } from '../../api/back';
import { SuggestionCity } from '../../components/SuggestionCity/SuggestionCity';
import { Api } from '../../api/api';
import man from '../../assets/settings/man.svg'
import woman from '../../assets/settings/woman.svg'
import bi from '../../assets/settings/bi.svg'
import send from '../../assets/send.svg'
import s from './style.module.css'
import { BlockedUserList } from '../../components/BlockedUserList/BlockedUserList';

export function Settings() {
	const [selectedDay, setSelectedDay] = useState('');
	const [selectedMonth, setSelectedMonth] = useState('');
	const [selectedYear, setSelectedYear] = useState('');
	const [preference, setPreference] = useState('');
	const [interests, setInterests] = useState<number[]>([]);
	const [description, setDescription] = useState<string>('');
	const [msgDescription, setMsgDescription] = useState<string>('');
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confPassword, setConfPassword] = useState<string>('');
	const [city, setCity] = useState<string>('');
	const [photos, setPhotos] = useState<Array<any>>([]);
	const [errPhotos, setErrPhotos] = useState<string | null>(null);
	const [msgInput, setMsgInput] = useState<string | null>(null);
	const [legalAge, setLegalAge] = useState(true);
	const [blockList, setBlockList] = useState<any>(null);
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
						setErrPhotos(null);
					} else {
						setErrPhotos(response.data);
					}
				}
			} catch (error) {
				setErrPhotos('Une erreur est survenue');
			}
		};
		reader.readAsDataURL(file);
	};


	async function handleRemovePhoto(index: number) {
		const updatedPhotos = [...photos];
		updatedPhotos[index] = null;
		setPhotos(updatedPhotos);
		try {
			const token = getToken();

			if (token) {
				await BackApi.removePhoto(index + 1, token)
			}
		} catch (error) {
			setErrPhotos('Une erreur est survenue');
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
			setInterests(user.interests);
			const rep = await BackApi.getPhotoById(selector.id, token);
			setPhotos([rep.data.photo1, rep.data.photo2, rep.data.photo3, rep.data.photo4, rep.data.photo5]);
			const city = await Api.getCityByPositionGps(user.location);
			if (city.status === 200) {
				const cityCountry = city.data.features[0].text_fr + ', ' + city.data.features[0].language_fr;
				setCity(cityCountry);
			} else {
				setCity('Enter your city');
			}
			const getBlockList = await BackApi.getBlockList(token);
			if (getBlockList.status === 200) {
				setBlockList(getBlockList.data);
			}
		}
	}

	async function handleChangeDate(e: React.ChangeEvent<HTMLSelectElement>) {
		let day = selectedDay, month = selectedMonth, year = selectedYear;
		if (e.target.name === 'day') {
			day = e.target.value;
			setSelectedDay(e.target.value)
		} else if (e.target.name === 'month') {
			month = e.target.value;
			setSelectedMonth(e.target.value)
		} else {
			year = e.target.value;
			setSelectedYear(e.target.value)
		}


		if (day !== '' && month !== '' && year !== '') {
			const selectedDate = new Date(
				parseInt(year),
				parseInt(month) - 1,
				parseInt(day)
				);
			const eighteenYearsAgo = new Date();
			eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
			setLegalAge(selectedDate <= eighteenYearsAgo);
			if (selectedDate <= eighteenYearsAgo) {
				const selectedDate: string = year + '-' + month + '-' +day;
				const token = getToken();
				if (token) {
					const rep = await BackApi.updateBirth(token, selectedDate);
					if (rep.status === 200) {
						setLegalAge(true);
					}
				}
			}
		} else {
			setLegalAge(true);
		}
	}

	function removeNewlines(inputString: string): string {
		const pattern = /[\r\n]+/g;
		return inputString.replace(pattern, " ");
	}

	async function sendDescription() {
		const token = getToken();
		if (token) {
			const newDescription = removeNewlines(description);
			const rep = await BackApi.updateDescripion(token, newDescription);
			if (rep.status === 200) {
				setMsgDescription('Description updated');
			}
		}
	}

	async function handleClickUsername() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.updateUsername(token, username);
			if (rep.status === 200) {
				setMsgInput(rep.data.message);
			} else {
				setMsgInput(rep);
			}
		}
	}

	async function handleClickFirstName() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.updateFirstName(token, firstName);
			if (rep.status === 200) {
				dispatch(saveFirstName(firstName));
				setMsgInput(rep.data.message);
			} else {
				setMsgInput(rep);
			}
		}
	}

	async function handleClickLastName() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.updateLastName(token, lastName);
			if (rep.status === 200) {
				setMsgInput(rep.data.message);
			} else {
				setMsgInput(rep);
			}
		}
	}

	async function handleClickEmail() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.updateEmail(token, email);
			if (rep.status === 200) {
				setMsgInput(rep.data.message);
			} else {
				setMsgInput(rep);
			}
		}
	}

	async function handleClickPassword() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.updatePassword(token, password);
			if (rep.status === 200) {
				setMsgInput(rep.data.message);
			} else {
				setMsgInput(rep);
			}
		}
	}

	useEffect(() => {
		dispatch(saveSection('Settings'));
		if (selector.id !== 0) {
			getInfoUser();
		}
		// eslint-disable-next-line
	}, [selector.id])

	// useEffect(() => {
	// 	checkPassword(password, confPassword, setMsgInput);
	// }, [password, confPassword])

	if (selector.id === 0 || !blockList) {
		return (<></>);
	}

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
							onChange={handleChangeDate}
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
							onChange={handleChangeDate}
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
							onChange={handleChangeDate}
						>
							<option value="">Year</option>
							{years.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
					</div>
					{!legalAge && <span className={s.error}>You must be of legal age to create an account</span>}
					<div className={s.prefAndLoc}>
						<div className={s.preference}>
							<span className={s.title}>Preference</span>
							<div className={s.choicePreference}>
								<SettingsPreference name='man' logo={man} isSelected={preference === 'man'} setSelectedPreference={setPreference} />
								<SettingsPreference name='woman' logo={woman} isSelected={preference === 'woman'} setSelectedPreference={setPreference} />
								<SettingsPreference name='both' logo={bi} isSelected={preference === 'both'} setSelectedPreference={setPreference} />
							</div>
						</div>
						<div className={s.location}>
							<span className={s.title}>Location</span>
							<SuggestionCity placeHolder={city} />
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
						<div className={s.footerDescription}>
							<p className={s.char}>{description?.length}/{maxChar}</p>
							<div className={s.sendButton} onClick={sendDescription}>
								<img src={send} alt='sendButton' />
							</div>
							{msgDescription && <span className={s.msgDescription}>{msgDescription}</span>}
						</div>
					</div>
				</div>
				<div className={s.rightCtn}>
					<div className={s.hobbies}>
						<span className={s.title}>Hobbies</span>
						<div className={s.hobbies}>
							<InterestFilter
								interests={interests}
								setInterests={setInterests}
								search={false}
							/>
						</div>
					</div>
					<div className={s.information}>
						<span className={s.title}>User information</span>
						<div className={s.input}>
							<InputSettings handleClick={handleClickFirstName} name='firstName' text={true} content={firstName} setContent={setFirstName} placeholder='First name'/>
							<InputSettings handleClick={handleClickLastName} name='lastName' text={true} content={lastName} setContent={setLastName} placeholder='Last name'/>
						</div>
						<div className={s.input}>
							<InputSettings handleClick={handleClickEmail} name='email' text={true} content={email} setContent={setEmail} placeholder='Email'/>
							<InputSettings handleClick={handleClickUsername} name='username' text={true} content={username} setContent={setUsername} placeholder='Username'/>
						</div>
						<div className={s.input}>
							<InputSettings handleClick={handleClickPassword} name='password' text={false} content={password} setContent={setPassword} placeholder='New password'/>
							<InputSettings handleClick={handleClickPassword} name='confirmPassword' text={false} content={confPassword} setContent={setConfPassword} placeholder='Confirm new password'/>
						</div>
						{msgInput && <span className={s.msgInput}>{msgInput}</span>}
					</div>
				</div>
			</div>
			<div className={s.photos}>
				<span className={s.title}>Photos</span>
				{errPhotos && <span className={s.err}>{errPhotos}</span>}
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
			{blockList.length > 0 &&
				<div className={s.blockList}>
					<span className={s.title}>Users blocked</span>
					<div className={s.listUsersBlocked}>
						{blockList.map((user: any) => {
							return (
								<div key={user.id_user_target} className={s.imagesBlock}>
									<BlockedUserList
										idUser={user.id_user_target}
										blockList={blockList}
										setBlockList={setBlockList}
									/>
								</div>
							);
						})}
					</div>
				</div>
			}
		</div>
	);
}