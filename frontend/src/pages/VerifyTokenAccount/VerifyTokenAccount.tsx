import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { BackApi } from '../../api/back';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../../assets/verify.svg';
import styles from './style.module.css';
import { createCookie } from '../../utils/auth';
import { Api } from '../../api/api';

export function VerifyTokenAccount() {
	const { token } = useParams();
	const [message, setMessage] = useState('');
	const [verified, setVerified] = useState<boolean>(false);
	const [locationIsSet, setLocationIsSet] = useState<boolean>(false);
	const navigate = useNavigate();

	async function checkToken() {
		if (token) {
			const response = await BackApi.verifyEmail(token);
			setMessage(response.data.message + ' Please allow location access');
			createCookie('token', response.data.token);
			setVerified(true);
			if (response.status === 200) {
				try {
					const rep: any = await geoLocation();
					console.log(rep);
					const location = rep.latitude + ',' + rep.longitude;
					await BackApi.updateLocation(response.data.token, location);
				} catch (error) {
					setLocationIsSet(true);
				}
				// const rep = await Api.getIpInfo();
				// const location = rep.data.loc;
				setLocationIsSet(true);
			} else {
				setMessage(response);
			}
		}
	}

	function geoLocation() {
		return new Promise((resolve, reject) => {
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const latitude = position.coords.latitude;
						const longitude = position.coords.longitude;
						resolve({ latitude, longitude });
					},
					(error) => {
						reject(new Error("Error obtaining location: " + error.message));
					}
				);
			} else {
				reject(new Error("Geolocation is not available in this browser."));
			}
		});
	}

	useEffect(() => {
		checkToken();
	}, [])

	useEffect(() => {
		if (verified && locationIsSet) {
			const timeoutId = setTimeout(() => {
				navigate(`/settings`);
			}, 1000);
			
			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [verified, locationIsSet]);

	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<div className={styles.logo}>
					<img className={styles.image} src={logo} alt="comma" />
				</div>
				<div className={styles.verif}>
					<p>{message}</p>
					{verified &&
						<>
							<span>You will be redirected in a few moments.</span>
							<div className={styles.loader}></div>
						</>
					}
				</div>
			</div>
		</div>
	);
}
