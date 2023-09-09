import { InputLogin } from '../../components/InputLogin/InputLogin';
import { ButtonLogin } from '../../components/ButtonLogin/ButtonLogin';
// eslint-disable-next-line
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackApi } from '../../api/back';
// eslint-disable-next-line
import { checkPassword, createCookie, parseJwt } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { saveId } from '../../store/user/user-slice';
import logo from '../../assets/logo.png'
import s from './style.module.css'

export function Signup() {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [password, setPassword] = useState<string>('');
	const [confPassword, setConfPassword] = useState<string>('');
	const [err, setErr] = useState<string>('');
	const [backErr, setBackErr] = useState<string>('');

	function checkValues(obj: any) {
		const { email, username, firstName, lastName, password, confirmPassword } = obj;
		if (!email || !username || !firstName || !lastName || !password || !confirmPassword ) {
			return setErr('Missing required parameters');
		}
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const obj = Object.fromEntries(formData);
		checkValues(obj);
		if (!err) {
			const rep = await BackApi.signup(obj);
			if (rep.status === 200) {
				const id = parseJwt(rep.data.token).userId;
				createCookie("token", rep.data.token);
				dispatch(saveId(id));
				navigate('/age');
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
						Join Flirtopia
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
							<div className={s.inputLogin}>
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