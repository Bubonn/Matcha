import { useNavigate } from 'react-router-dom';
import s from './style.module.css'

interface ButtonSideMenuProps {
	section: any;
	updateSection: any;
	name: string;
	logo: any;
}

export function ButtonSideMenu({ section, updateSection, name, logo }: ButtonSideMenuProps) {

	const navigate = useNavigate();

	function handleClick() {
		updateSection(name)
		navigate(name.toLocaleLowerCase());
	}

	return (
		<div 
			className={s.container}
			onClick={handleClick}
			style={{backgroundColor: section === name ? '#000000' : '#282828'}}
		>
			<img className={s.logo} src={logo} alt='logoMenu'/>
			{name}
		</div>
	);
}