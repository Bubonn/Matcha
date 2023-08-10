import { useEffect, useState } from 'react';
import { UserRelation } from '../../components/UserRelation/UserRelation';
import { InterestProfile } from '../../components/InterestProfile/InterestProfile';
import { UserDetails } from '../../components/UserDetails/UserDetails';
import { saveSection } from '../../store/user/user-slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useParams } from 'react-router';
import { BackApi } from '../../api/back';
import { getToken } from '../../utils/auth';
import { Api } from '../../api/api';
import chevronL from '../../assets/chevronLeft.svg'
import chevronR from '../../assets/chevronRight.svg'
import fire from '../../assets/profile/fire.svg'
import flag from '../../assets/profile/flag.svg'
import heart from '../../assets/profile/heart.svg'
import location from '../../assets/profile/location.svg'
import locationFrom from '../../assets/profile/locationFrom.svg'
import logoUser from '../../assets/profile/user.svg'
import like from '../../assets/profile/like.svg'
import dislike from '../../assets/profile/dislike.svg'
import s from './style.module.css'
import { getSocket } from '../../utils/socket';

export function Profile() {
	const { id } = useParams();
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [user, setUser] = useState<any>(null);
	const [activeUser, setActiveUser] = useState<any>(null);
	const [city, setCity] = useState<any>(null);
	const [images, setImages] = useState<any>(null);
	const [relation, setRelation] = useState<null | string>(null);
	const [socket, setSocket] = useState<any>(null);
	const dispatch = useDispatch();
	const selector = useSelector((store: RootState) => store.user.user);

	const previousImage = () => {
		const newIndex = (currentImageIndex + images.length - 1) % images.length;
		setCurrentImageIndex(newIndex);
	};

	const nextImage = () => {
		const newIndex = (currentImageIndex + 1) % images.length;
		setCurrentImageIndex(newIndex);
	};

	async function getUserInfos() {
		const token = getToken();
		if (token) {
			const response = await BackApi.getUserById(Number(id), token);
			setUser(response.data);

			const user = await BackApi.getUserById(selector.id, token);
			setActiveUser(user.data);

			const rep = await BackApi.getPhotoById(Number(id), token);
			const photos = [rep.data.photo1, rep.data.photo2, rep.data.photo3, rep.data.photo4, rep.data.photo5];
			const nonNullPhotos = photos.filter((photo) => photo !== null);
			setImages(nonNullPhotos);

			const city = await Api.getCityByPositionGps(response.data.location);
			const cityCountry = city.data.features[0].text_fr + ', ' + city.data.features[0].language_fr
			setCity(cityCountry);
		}
	}

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'ArrowLeft') {
			previousImage();
		} else if (event.key === 'ArrowRight') {
			nextImage();
		}
	};

	async function handleClickLike() {
		// const token = getToken();
		// if (token) {
			// const rep = await BackApi.likeUser(token, id);
			// console.log(rep.data);
		// }
		socket.emit('like', { sender_id: selector.id, recipient_id: Number(id) })
		setRelation('refresh like')
	}

	async function handleClickDislike() {
		// const token = getToken();
		// if (token) {
			// const rep = await BackApi.dislikeUser(token, id);
			// console.log(rep.data);
		// }
		socket.emit('dislike', { sender_id: selector.id, recipient_id: Number(id) })
		setRelation('refresh dislike')
	}

	useEffect(() => {
		if (images) {
			const addKeyDownListener = () => {
				document.addEventListener('keydown', handleKeyDown);
			};

			const removeKeyDownListener = () => {
				document.removeEventListener('keydown', handleKeyDown);
			};

			addKeyDownListener();

			return removeKeyDownListener;
		}
		// eslint-disable-next-line
	}, [images, currentImageIndex]);

	useEffect(() => {
		if (selector.id !== 0) {
			dispatch(saveSection('Profile'));
			getUserInfos();
			const sock: any = getSocket();
			setSocket(sock)
		}
		// eslint-disable-next-line
	}, [selector.id, Number(id)])

	if (selector.id === 0 || !user || !images || !activeUser) {
		return (<></>);
	}

	return (
		<div className={s.container}>
			<div className={s.images}>
				<div className={s.imageContainer}>
					<img className={s.image} src={`data:image/jpeg;base64,${images[currentImageIndex]}`} alt='ProfileImage' />
					<img className={s.chevronL} src={chevronL} onClick={previousImage} alt='chevronL'/>
					<img className={s.chevronR} src={chevronR} onClick={nextImage} alt='chevronR'/>
				</div>
			</div>
			<div className={s.infos}>
				<div className={s.location}>
					<img className={s.imgLocation} src={location} alt='location'/>
					{city}
				</div>
				<div className={s.userInfo}>
					<div className={s.name}>
						{user.firstName}, {user.age}
						{selector.id !== Number(id) && <img className={s.imgFlag} src={flag} alt='flag'/>}
					</div>
					<div className={s.state}>
						<div className={s.dot}></div>
						Online
					</div>
				</div>
				<div className={s.relation}>
					<UserRelation id={id} relation={relation} setRelation={setRelation}/>
				</div>
				<div className={s.hobbies}>
					<InterestProfile
						user={user}
						activeUser={activeUser}
					/>
				</div>
				<div className={s.interests}>
					<UserDetails img={fire} info={'130'}/>
					<UserDetails img={logoUser} info={user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}/>
					<UserDetails img={heart} info={user.preference.charAt(0).toUpperCase() + user.preference.slice(1)}/>
					{selector.id !== Number(id) && <UserDetails img={locationFrom} info={`${user.distance} Km from you`}/>}
				</div>
				<div className={s.description}>
					<p className={s.title}>About me</p>
					<p className={s.content}>{user.description}</p>
				</div>
				{selector.id !== Number(id) &&
					<div className={s.actionButton}>
						{relation === 'You have matched with this user' || relation === 'You like this user' ?
							(<div className={s.button} onClick={handleClickDislike}>
								<img src={dislike} alt='dislike' />
							</div>)
							:
							(<div className={s.button} onClick={handleClickLike}>
								<img src={like} alt='like' />
							</div>)
						}
					</div>}
			</div>
		</div>
	);
}


// SELECT COUNT(*) AS mutual_likes_count
// FROM likes AS l1
// JOIN likes AS l2 ON l1.id_utilisateur_source = l2.id_utilisateur_cible
//                   AND l1.id_utilisateur_cible = l2.id_utilisateur_source
// WHERE l1.id_utilisateur_source = 1 AND l1.id_utilisateur_cible = 2;
