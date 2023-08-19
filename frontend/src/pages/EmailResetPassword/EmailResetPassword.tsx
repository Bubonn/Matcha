import logo from '../../assets/resetPassword.svg';
import styles from './style.module.css';

export function EmailResetPassword() {
	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<div className={styles.logo}>
					<img className={styles.image} src={logo} alt="comma" />
				</div>
				<div className={styles.description}>
					<p>Reset your password</p>
				</div>
				<div className={styles.verif}>
					<p>An email has been sent to reset your password</p>
				</div>
			</div>
		</div>
	);
}