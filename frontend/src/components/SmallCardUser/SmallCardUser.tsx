import fire from '../../assets/profile/fire.svg'
import user from '../../assets/test/User.svg'
import location from '../../assets/location.svg'
import s from './style.module.css'

export function SmallCardUser() {
	return (
		<div className={s.container}>
			<img className={s.img} src={user} alt='user'/>
			<div className={s.infoUser}>
				<div className={s.user}>
					<div className={s.name}>Gladys, 26</div>
					<div className={s.popularity}>
						<img src={fire} alt='fire' />
						<span className={s.scorePopularity}>140</span>
					</div>
				</div>
				<div className={s.city}>
					<img className={s.imgLocation} src={location} alt='location' />
					Paris, Ile de france
				</div>
			</div>
		</div>
	);
}