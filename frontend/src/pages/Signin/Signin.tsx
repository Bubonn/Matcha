import logo from '../../assets/logo.png'
import s from './style.module.css'
import { InputLogin } from '../../components/InputLogin/InputLogin';
import { ButtonLogin } from '../../components/ButtonLogin/ButtonLogin';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackApi } from '../../api/back';

export function Signin() {

	const navigate = useNavigate();

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const obj = Object.fromEntries(formData);
		// console.log(obj);
		const rep = await BackApi.signin(obj);
		navigate('/age');
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
							<div className={s.input}>
								<InputLogin
									label='Username'
									name='username'
									placeholder='Enter your username'
									small={false}
								/>
								<InputLogin
									label='Password'
									name='password'
									placeholder='Enter your password'
									small={false}
								/>
								<div
									className={s.forgot}
									onClick={() => navigate('/forgotPassword')}
								>
									Forgot password ?
								</div>
							</div>
							<div className={s.space}>
								<div className={s.button}>
									<ButtonLogin
									name={'Signin'}
									small={false}
									colorPink={true}
									isSubmit={true}
								/>
								</div>
								<ButtonLogin
									name={'Signup'}
									small={false}
									colorPink={false}
									isSubmit={false}
									onClick={() => navigate('/signup')}
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
