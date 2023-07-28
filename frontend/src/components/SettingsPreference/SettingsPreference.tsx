import { BackApi } from '../../api/back';
import { getToken } from '../../utils/auth';
import s from './style.module.css'

interface SettingsPreferenceProps {
	name: string;
	logo: any;
	isSelected: boolean;
	setSelectedPreference: any;
}

export function SettingsPreference({ name, logo, isSelected, setSelectedPreference }: SettingsPreferenceProps) {

	async function handleChangePreference() {
		setSelectedPreference(name)
		const token = getToken();
		if (token) {
			await BackApi.updatePreference(token, name);
		}
	}

	return (
		<div
			className={s.container}
			style={{backgroundColor: isSelected ? '#FB025D' : '#282828'}}
			onClick={handleChangePreference}
		>
			<img src={logo} alt='logoGender' />
		</div>
	);
}