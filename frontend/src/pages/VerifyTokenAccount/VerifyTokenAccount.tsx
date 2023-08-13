import { useSelector } from 'react-redux';
import logo from '../../assets/verify.svg';
import styles from './style.module.css';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { BackApi } from '../../api/back';
import { getToken } from '../../utils/auth';
import { useParams } from 'react-router-dom';

export function VerifyTokenAccount() {
	const { token } = useParams();
	const [message, setMessage] = useState('');
	
	async function checkToken() {
		if (token) {
			const response = await BackApi.verifyEmail(token);
			if (response.status === 200) {
				setMessage(response.data.message);
			} else {
				setMessage(response);
			}
		}
	}

	useEffect(() => {
		checkToken();
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<div className={styles.logo}>
					<img className={styles.image} src={logo} alt="comma" />
				</div>
				{/* <div className={styles.description}> */}
					{/* <p>Verify your account</p> */}
				{/* </div> */}
				<div className={styles.verif}>
					<p>{message}</p>
				</div>
			</div>
		</div>
	);
}
