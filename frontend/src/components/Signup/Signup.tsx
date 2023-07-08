import logo from '../../assets/logo.png'
import s from './style.module.css'

export function Signup() {
	return (
		<div className={s.container}>
			<div className={s.bgSignupBox}>
				<div className={s.signupBox}>
					<div className={s.name}>
						<img className={s.image} src={logo} alt='logo' />
						Join Flirtopia now
					</div>
				</div>
			</div>
		</div>
	);
}