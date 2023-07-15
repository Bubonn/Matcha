import fire from '../../assets/LargeCard/fire.svg'
import user from '../../assets/LargeCard/user.svg'
import location from '../../assets/LargeCard/location.svg'
import distance from '../../assets/LargeCard/distance.svg'
import testUuser from '../../assets/test/C.png'
// import location from '../../assets/location.svg'
import s from './style.module.css'
import { LargeCardInfo } from '../LargeCardInfo/LargeCardInfo'

export function LargeCardUser() {
	return (
		<div className={s.container}>
			<img className={s.img} src={testUuser} alt='user'/>
			<div className={s.infoUser}>
				<div className={s.user}>
					<div className={s.name}>
						Gladys, 26
					</div>
					<div className={s.otherInfo}>
						<LargeCardInfo img={user} alt={'user'} content='Woman'/>
						<LargeCardInfo img={fire} alt={'fire'} content='140'/>
						<LargeCardInfo img={location} alt={'location'} content='Paris, Ile de france'/>
						<LargeCardInfo img={distance} alt={'distance'} content='4 Km from you'/>
					</div>
				</div>
			</div>
		</div>
	);
}