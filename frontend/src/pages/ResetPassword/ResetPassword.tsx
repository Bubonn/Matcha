import { InputLogin } from '../../components/InputLogin/InputLogin';
import { ButtonLogin } from '../../components/ButtonLogin/ButtonLogin';
import { FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BackApi } from '../../api/back';
import logo from '../../assets/logo.png'
import s from './style.module.css'

export function ResetPassword() {
	const navigate = useNavigate();
	const [backErr, setBackErr] = useState<string>('');
	const { token } = useParams();
	


	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const obj = Object.fromEntries(formData);
		if (obj.password !== obj.confPassword) {
			setBackErr('Passwords must be the same');
		} else {
			const rep = await BackApi.resetPassword(obj.password, obj.confPassword, token);
			if (rep.status === 200) {
				navigate('/signin')
			} else {
				setBackErr(rep);
			}
		}
	}

	return (
		<div className={s.container}>
			<div className={s.bgSignupBox}>
				<div className={s.signupBox}>
					<div className={s.name}>
						<img className={s.image} src={logo} alt='logo' />
						Flirtopia
					</div>
					<form onSubmit={handleSubmit}>
						<div className={s.form}>
							<div className={s.input}>
								<InputLogin
									label='Password'
									name='password'
									placeholder='Enter your password'
									small={false}
									isPassword={true}
								/>
								<InputLogin
									label='Confirm Password'
									name='confPassword'
									placeholder='Confirm your password'
									small={false}
									isPassword={true}
								/>
							</div>
							{backErr && <span className={s.error}>{backErr}</span>}
							<div className={s.space}>
								<div className={s.button}>
									<ButtonLogin
									name={'Change password'}
									small={false}
									colorPink={true}
									isSubmit={true}
								/>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
