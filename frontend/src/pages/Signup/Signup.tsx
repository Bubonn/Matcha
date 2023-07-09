import logo from '../../assets/logo.png'
import s from './style.module.css'
import { InputLogin } from '../../components/InputLogin/InputLogin';
import { ButtonLogin } from '../../components/ButtonLogin/ButtonLogin';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export function Signup() {

	const navigate = useNavigate();

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const emailValue = formData.get("email") as string;
		console.log(emailValue);
	}

	return (
		<div className={s.container}>
			<div className={s.bgSignupBox}>
				<div className={s.signupBox}>
					<div className={s.name}>
						<img className={s.image} src={logo} alt='logo' />
						Join Flirtopia now
					</div>
					<form onSubmit={handleSubmit}>
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
								name='firstName'
								placeholder='Enter your first name'
								small={false}
							/>
							<InputLogin
								label='Last name'
								name='lastName'
								placeholder='Enter your last name'
								small={false}
							/>
							<div className={s.space}>
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
							<div className={s.space}>
								<ButtonLogin
									name={'Join now'}
									small={true}
									colorPink={true}
									isSubmit={true}
								/>
								<ButtonLogin
									name={'Signin'}
									small={true}
									colorPink={false}
									isSubmit={false}
									onClick={() => navigate('/signin')}
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}