import { useNavigate } from 'react-router-dom'
import { LargeCardInfo } from '../LargeCardInfo/LargeCardInfo'
import fire from '../../assets/LargeCard/fire.svg'
import logoUser from '../../assets/LargeCard/user.svg'
import location from '../../assets/LargeCard/location.svg'
import distance from '../../assets/LargeCard/distance.svg'
import s from './style.module.css'

export function LargeCardUser({ user }: { user: any }) {

	const navigate = useNavigate();

	return (
		<div className={s.container} onClick={() => navigate(`/profile/${user.id}`)}>
			<img className={s.img} src={`data:image/jpeg;base64,${user.mainPhoto}`} loading='lazy' alt='ProfileImage' />
			<div className={s.infoUser}>
				<div className={s.user}>
					<div className={s.otherInfo}>
						<LargeCardInfo img={logoUser} alt={'user'} content={user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}/>
						<LargeCardInfo img={fire} alt={'fire'} content='140'/>
						<LargeCardInfo img={location} alt={'location'} content='Paris, Ile de france'/>
						<LargeCardInfo img={distance} alt={'distance'} content={`${user.distance} Km from you`}/>
					</div>
					<div className={s.name}>
						{user.firstName}, {user.age}
					</div>
				</div>
			</div>
		</div>
	);
}