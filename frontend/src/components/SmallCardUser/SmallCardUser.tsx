import fire from '../../assets/profile/fire.svg'
import tmpUser from '../../assets/test/User.svg'
// import location from '../../assets/location.svg'
import distance from '../../assets/LargeCard/distance.svg'
import s from './style.module.css'
import { useEffect, useState } from 'react'
import { getToken } from '../../utils/auth'
import { BackApi } from '../../api/back'
import { useNavigate } from 'react-router-dom'

export function SmallCardUser({ likeInfo }: { likeInfo: any }) {
	
	const navigate = useNavigate();
	const [user, setUser] = useState<any>(null);

	async function getUserInfo() {
		const token = getToken();
		if (token) {
			const rep = await BackApi.getUserById(likeInfo.id_user_source, token);
			console.log(rep.data);
			setUser(rep.data);
		}
	}

	useEffect(() => {
		getUserInfo();
	}, [])

	if (!user) {
		return (<></>);
	}

	return (
		<div className={s.container} onClick={() => navigate(`/profile/${user.id}`)}>
			<img className={s.img} src={`data:image/jpeg;base64,${user.mainPhoto}`} alt='user'/>
			<div className={s.infoUser}>
				<div className={s.user}>
					<div className={s.name}>{user.firstName}, {user.age}</div>
					<div className={s.popularity}>
						<img src={fire} alt='fire' />
						<span className={s.scorePopularity}>{user.popularity}</span>
					</div>
				</div>
				<div className={s.city}>
					<img className={s.imgLocation} src={distance} alt='location' />
					{user.distance} Km from you
				</div>
			</div>
		</div>
	);
}