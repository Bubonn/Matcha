import { InputLogin } from '../../components/InputLogin/InputLogin';
import { ButtonLogin } from '../../components/ButtonLogin/ButtonLogin';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import s from './style.module.css'
import { BackApi } from '../../api/back';

export function ForgotPassword() {

	const navigate = useNavigate();
	const [err, setErr] = useState<null | string>(null);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const emailValue: any = formData.get("email");
		if (emailValue) {
			const rep = await BackApi.sendEmailResetPassword(emailValue);
			if (rep.status === 200) {
				return navigate('/emailResetPassword')
			} else {
				setErr(rep);
			}
		}
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
									label='Email'
									name='email'
									placeholder='Enter your email'
									small={false}
								/>
							{err && <span className={s.error}>{err}</span>}
							</div>
							<div className={s.space}>
								<div className={s.button}>
									<ButtonLogin
										name={'Send email'}
										small={false}
										colorPink={true}
										isSubmit={true}
										/>
								</div>
								<ButtonLogin
									name={'Signin'}
									small={false}
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