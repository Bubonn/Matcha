import { useNavigate } from 'react-router-dom';
import s from './style.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface ButtonSideMenuProps {
	section: any;
	updateSection: any;
	name: string;
	logo: any;
}

export function ButtonSideMenu({ section, updateSection, name, logo }: ButtonSideMenuProps) {

	const selector = useSelector((store: RootState) => store.user.user);
	const navigate = useNavigate();

	function handleClick() {
		updateSection(name)
		if (name === 'Profile') {
			navigate(name.toLocaleLowerCase() + '/' + selector.id);
		} else {
			navigate(name.toLocaleLowerCase());
		}
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