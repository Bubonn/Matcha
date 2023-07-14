import { useState } from 'react';
import { UserRelation } from '../../components/UserRelation/UserRelation';
import { InterestProfile } from '../../components/InterestProfile/InterestProfile';
import { UserDetails } from '../../components/UserDetails/UserDetails';
import imgA from '../../assets/test/A.png'
import imgB from '../../assets/test/B.png'
import imgC from '../../assets/test/C.png'
import chevronL from '../../assets/chevronLeft.svg'
import chevronR from '../../assets/chevronRight.svg'
import fire from '../../assets/profile/fire.svg'
import flag from '../../assets/profile/flag.svg'
import heart from '../../assets/profile/heart.svg'
import location from '../../assets/profile/location.svg'
import locationFrom from '../../assets/profile/locationFrom.svg'
import user from '../../assets/profile/user.svg'
import like from '../../assets/profile/like.svg'
import s from './style.module.css'

export function Profile() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const images = [imgA, imgB, imgC];

	const previousImage = () => {
		const newIndex = (currentImageIndex + images.length - 1) % images.length;
		setCurrentImageIndex(newIndex);
	};

	const nextImage = () => {
		const newIndex = (currentImageIndex + 1) % images.length;
		setCurrentImageIndex(newIndex);
	};

	return (
		<div className={s.container}>
			<div className={s.images}>
				<div className={s.imageContainer}>
					<img className={s.image} src={images[currentImageIndex]} alt="ProfileImage" />
					<img className={s.chevronL} src={chevronL} onClick={previousImage} alt='chevronL'/>
					<img className={s.chevronR} src={chevronR} onClick={nextImage} alt='chevronR'/>
				</div>
			</div>
			<div className={s.infos}>
				<div className={s.location}>
					<img className={s.imgLocation} src={location} alt='location'/>
					Commercy, Meuse
				</div>
				<div className={s.userInfo}>
					<div className={s.name}>
						Eduardo, 24
						<img className={s.imgFlag} src={flag} alt='flag'/>
					</div>
					<div className={s.state}>
						<div className={s.dot}></div>
						Online
					</div>
				</div>
				<div className={s.relation}>
					<UserRelation text={'This user has liked you'}/>
				</div>
				<div className={s.hobbies}>
					<InterestProfile />
				</div>
				<div className={s.interests}>
					<UserDetails img={fire} info={'130'}/>
					<UserDetails img={user} info={'Man'}/>
					<UserDetails img={heart} info={'Woman'}/>
					<UserDetails img={locationFrom} info={'5 Km from you'}/>
				</div>
				<div className={s.description}>
					<p className={s.title}>About me</p>
					<p className={s.content}>Lorem ipsum dolor sit amet consectetur. Varius leo nec proin vitae quis est tristique eu adipiscing. Eleifend ultricies amet semper vitae amet lorem.</p>
				</div>
				<div className={s.actionButton}>
					<div className={s.button}>
						<img src={like} alt='like'/>
					</div>
				</div>
			</div>
		</div>
	);
}