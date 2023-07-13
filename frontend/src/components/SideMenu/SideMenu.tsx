import { ButtonSideMenu } from '../ButtonSideMenu/ButtonSideMenu';
import logo from '../../assets/flirtopia.png'
import search from '../../assets/search.svg'
import chat from '../../assets/chat.svg'
import profile from '../../assets/profile.svg'
import like from '../../assets/like.svg'
import history from '../../assets/history.svg'
import s from './style.module.css'

export function SideMenu() {
	return (
		<aside className={s.sideMenu}>
			<div className={s.nameSite}>
				<img className={s.logo} src={logo} alt='logo'/>
				<span className={s.pink}>Flirt</span>opia
			</div>
			<div className={s.navButtons}>
				<ButtonSideMenu name='Search' logo={search}/>
				<ButtonSideMenu name='Chat' logo={chat}/>
				<ButtonSideMenu name='Profile' logo={profile}/>
				<ButtonSideMenu name='Likes' logo={like}/>
				<ButtonSideMenu name='History' logo={history}/>
			</div>
			<div className={s.endNavButtons}>
				<ButtonSideMenu name='Settings' logo={history}/>
				<ButtonSideMenu name='Logout' logo={history}/>
			</div>
		</aside>
	);
}