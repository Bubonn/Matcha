import { BackApi } from '../../api/back';
import { getToken } from '../../utils/auth';
import s from './style.module.css'

interface SettingsGenderProps {
	name: string;
	logo: any;
	isSelected: boolean;
	setSelectedGender: any;
}

export function SettingsGender({ name, logo, isSelected, setSelectedGender }: SettingsGenderProps) {

	async function handleChangeGender() {
		setSelectedGender(name)
		const token = getToken();
		if (token) {
			await BackApi.updateGender(token, name);
		}
	}

	return (
		<div
			className={s.container}
			style={{backgroundColor: isSelected ? '#FB025D' : '#282828'}}
			onClick={handleChangeGender}
		>
			<img src={logo} alt='logoGender' />
		</div>
	);
}