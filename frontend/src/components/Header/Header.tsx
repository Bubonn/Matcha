import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import logo from '../../assets/notification.svg'
import s from './style.module.css'

interface HeaderProps {
	section: string
}

export function Header({ section }: HeaderProps) {

	const selector = useSelector((store: RootState) => store.user.user);

	if (selector.id === 0 || !selector.avatar || !selector.firstName) {
		return (
			<>
			</>
		);
	}

	return (
		<header className={s.header}>
			<div className={s.section}>
				{section}
			</div>
			<div className={s.user}>
				<div className={s.notification}>
					<img className={s.logoBell} src={logo} alt='notification'/>
					<div className={s.numberNotif}>3</div>
				</div>
				<div className={s.infoUser}>
					<img className={s.logoUser} src={`data:image/jpeg;base64,${selector.avatar}`} alt='userAvatar' />
					{selector.firstName}
				</div>
			</div>
		</header>
	);
}