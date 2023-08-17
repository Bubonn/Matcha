import { useSelector } from 'react-redux';
import logo from '../../assets/verify.svg';
import styles from './style.module.css';
import { RootState } from '../../store';
import { useEffect } from 'react';
import { BackApi } from '../../api/back';
import { getToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

export function VerifyAccount() {
	const selector = useSelector((store: RootState) => store.user.user);
	const navigate = useNavigate();
	
	async function sendEmail() {
		const token = getToken();
		if (token) {
			const response = await BackApi.getUserById(selector.id, token);
			if (response.status === 200 && response.data.verified) {
				return navigate(`/profile/${selector.id}`);
			}
			await BackApi.sendEmail(token, response.data.email);
		}
	}

	useEffect(() => {
		sendEmail();
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<div className={styles.logo}>
					<img className={styles.image} src={logo} alt="comma" />
				</div>
				<div className={styles.description}>
					<p>Verify your account</p>
				</div>
				<div className={styles.verif}>
					<p>A verification link has been sent to your email address.</p>
				</div>
			</div>
		</div>
	);
}

