import logo from '../../assets/notification.svg'
import logoUser from '../../assets/testUser.png'
import s from './style.module.css'

interface HeaderProps {
	section: string
}

export function Header({ section }: HeaderProps) {
	return (
		<header className={s.header}>
			<div className={s.section}>
				{section}
			</div>
			<div className={s.user}>
				<div className={s.notification}>
					<img className={s.logoBell} src={logo} alt='notification'/>
				</div>
				<div className={s.infoUser}>
					<img className={s.logoUser} src={logoUser} alt='logoUser'/>
					Jean-Baptiste
				</div>
			</div>
		</header>
	);
}