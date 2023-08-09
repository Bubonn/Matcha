import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import s from './style.module.css'

interface ButtonSideMenuProps {
	section: any;
	updateSection: any;
	name: string;
	logo: any;
	notification?: number
}

export function ButtonSideMenu({ section, updateSection, name, logo, notification }: ButtonSideMenuProps) {

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
			<div className={s.menuName}>
				<img className={s.logo} src={logo} alt='logoMenu'/>
				{name}
			</div>
			{notification !== undefined && notification > 0 && (<div className={s.notif}>{notification}</div>)}
		</div>
	);
}