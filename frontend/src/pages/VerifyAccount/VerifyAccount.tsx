import { useSelector } from 'react-redux';
import logo from '../../assets/verify.svg';
import styles from './style.module.css';
import { RootState } from '../../store';
import { useEffect } from 'react';
import { BackApi } from '../../api/back';
import { getToken } from '../../utils/auth';

export function VerifyAccount() {
	const selector = useSelector((store: RootState) => store.user.user);
	
	async function sendEmail() {
		// console.log('id', selector.id);
		const token = getToken();
		if (token) {
			// console.log('HMMM');
			await BackApi.sendEmail(token);
			// console.log('rep', rep.data);
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
