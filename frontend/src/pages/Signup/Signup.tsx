import logo from '../../assets/logo.png'
import s from './style.module.css'
import { InputLogin } from '../../components/InputLogin/InputLogin';
import { ButtonLogin } from '../../components/ButtonLogin/ButtonLogin';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackApi } from '../../api/back';

export function Signup() {

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

	function containsUpperCase(str: string) {
		const regex = /[A-Z]/;
		return regex.test(str);
	}

	function containsSpecialCharacter(str: string) {
		const regex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\|]/;
		return regex.test(str);
	}

	function containsDigit(str: string) {
		const regex = /\d/;
		return regex.test(str);
	}

	function checkPassword() {
		setBackErr('');
		if (!password && !confPassword) {
			return setErr('');
		}
		if (password.length < 8) {
			return setErr('Password must contain at least eight characters');
		}
		if (!containsUpperCase(password)) {
			return setErr('Password must contain at least one uppercase character');
		}
		if (!containsSpecialCharacter(password)) {
			return setErr('Password must contain at least one special character');
		}
		if (!containsDigit(password)) {
			return setErr('Password must contain at least one digit');
		}
		if (password !== confPassword) {
			return setErr('The two passwords must be the same');
		}
		setErr('');
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const obj = Object.fromEntries(formData);
		checkValues(obj);
		if (!err) {
			const rep = await BackApi.signup(obj);
			if (rep.status === 200) {
				navigate('/age');
			} else {
				setBackErr(rep);
			}
		}
	}

	useEffect(() => {
		checkPassword();
		// eslint-disable-next-line
	}, [password, confPassword])

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