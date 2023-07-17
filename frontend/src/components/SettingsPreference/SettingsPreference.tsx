import s from './style.module.css'

interface SettingsPreferenceProps {
	name: string;
	logo: any;
	isSelected: boolean;
	setSelectedPreference: any;
}

export function SettingsPreference({ name, logo, isSelected, setSelectedPreference }: SettingsPreferenceProps) {

	return (
		<div
			className={s.container}
			style={{backgroundColor: isSelected ? '#FB025D' : '#282828'}}
			onClick={() => setSelectedPreference(name)}
		>
			<img src={logo} alt='logoGender' />
		</div>
	);
}