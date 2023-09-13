import { InputLogin } from '../../components/InputLogin/InputLogin';
import { ButtonLogin } from '../../components/ButtonLogin/ButtonLogin';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BackApi } from '../../api/back';
import logo from '../../assets/logo.png'
import s from './style.module.css'
import { checkPassword } from '../../utils/auth';

export function ResetPassword() {
	const navigate = useNavigate();
	const [backErr, setBackErr] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confPassword, setConfPassword] = useState<string>('');
	const [err, setErr] = useState<string>('');
	const { token } = useParams();

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!password) {
			setErr('Passwords can\'t be empty');
		} else if (!err) {
			const rep = await BackApi.resetPassword(password, confPassword, token);
			if (rep.status === 200) {
				navigate('/signin')
			} else {
				setBackErr(rep);
			}
		}
	}

	useEffect(() => {
		setBackErr('');
		checkPassword(password, confPassword, setErr);
		// eslint-disable-next-line
	}, [password, confPassword])

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
									small={true}
									password={password}
									setPassword={setPassword}
									isPassword={true}
								/>
								<InputLogin
									label='Confirm Password'
									name='confirmPassword'
									placeholder='Enter your password'
									small={true}
									password={confPassword}
									setPassword={setConfPassword}
									isPassword={true}
								/>
							</div>
							{err && <span className={s.error}>{err}</span>}
							{!err && backErr && <span className={s.error}>{backErr}</span>}
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
