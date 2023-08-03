import { LargeCardInfo } from '../LargeCardInfo/LargeCardInfo'
import fire from '../../assets/LargeCard/fire.svg'
import logoUser from '../../assets/LargeCard/user.svg'
import location from '../../assets/LargeCard/location.svg'
import distance from '../../assets/LargeCard/distance.svg'
// import testUuser from '../../assets/test/C.png'
import s from './style.module.css'
import { useNavigate } from 'react-router-dom'

export function LargeCardUser({ user }: { user: any }) {

	const navigate = useNavigate();

	function getAge() {
		const birth: any = new Date(user.birth);
		const currentDate: any = new Date();
		const differenceInMillisec = currentDate - birth;
		const age = differenceInMillisec / (1000 * 60 * 60 * 24 * 365.25);
		return Math.floor(age);
	}

	return (
		<div className={s.container} onClick={() => navigate(`/profile/${user.id}`)}>
			{/* <img className={s.img} src={testUuser} alt='user'/> */}
			<img className={s.img} src={`data:image/jpeg;base64,${user.mainPhoto}`} loading='lazy' alt='ProfileImage' />
			<div className={s.infoUser}>
				<div className={s.user}>
					<div className={s.otherInfo}>
						<LargeCardInfo img={logoUser} alt={'user'} content={user.gender}/>
						<LargeCardInfo img={fire} alt={'fire'} content='140'/>
						<LargeCardInfo img={location} alt={'location'} content='Paris, Ile de france'/>
						<LargeCardInfo img={distance} alt={'distance'} content={`${user.distance} Km from you`}/>
					</div>
					<div className={s.name}>
						{user.firstName}, {getAge()}
					</div>
				</div>
			</div>
		</div>
	);
}