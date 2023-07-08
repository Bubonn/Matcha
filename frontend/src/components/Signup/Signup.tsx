import { InputLogin } from '../InputLogin/InputLogin';
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
					<form>
						<div className={s.form}>
							<InputLogin
								label='Email'
								name='email'
								placeholder='Enter your email'
								small={false}
							/>
							<InputLogin
								label='Username'
								name='username'
								placeholder='Enter your username'
								small={false}
							/>
							<InputLogin
								label='First name'
								name='email'
								placeholder='Enter your first name'
								small={false}
							/>
							<InputLogin
								label='Last name'
								name='email'
								placeholder='Enter your last name'
								small={false}
							/>
							<div className={s.password}>
								<InputLogin
									label='Password'
									name='password'
									placeholder='Enter your password'
									small={true}
								/>
								<InputLogin
									label='Confirm Password'
									name='confirmPassword'
									placeholder='Enter your password'
									small={true}
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}