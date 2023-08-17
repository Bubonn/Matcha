import { useSelector } from 'react-redux';
import logo from '../../assets/verify.svg';
import styles from './style.module.css';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { BackApi } from '../../api/back';
import { getToken } from '../../utils/auth';
import { useNavigate, useParams } from 'react-router-dom';

export function VerifyTokenAccount() {
	const { token } = useParams();
	const [message, setMessage] = useState('');
	const [verified, setVerified] = useState<boolean>(false);
	const navigate = useNavigate();
	const selector = useSelector((store: RootState) => store.user.user);
	
	async function checkToken() {
		if (token) {
			const response = await BackApi.verifyEmail(token);
			if (response.status === 200) {
				setMessage(response.data.message);
				setVerified(true);
			} else {
				setMessage(response);
			}
		}
	}

	useEffect(() => {
		checkToken();
	}, [])

	useEffect(() => {
		if (verified) {
			const timeoutId = setTimeout(() => {
				navigate(`/settings`);
			}, 3000);
			
			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [verified]);

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
