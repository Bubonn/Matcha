import { useState } from 'react';
import s from './style.module.css'

interface InputLoginProps {
	label: string;
	name: string;
	placeholder: string;
	small: boolean;
	password?: string;
	setPassword?: any;
	isPassword?: boolean;
}

export function InputLogin({ label, name, placeholder, small, password, setPassword, isPassword }: InputLoginProps) {
	const [value, setValue] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (setPassword) {
			setPassword(e.target.value);
		}
		setValue(e.target.value);
	};

	return (
		<div className={s.container}>
			<label className={s.label} htmlFor={name} > {label} </label>
			<input
				style={{
					width: small ? '30vw' : '310px',
					maxWidth: small ? '200px' : '310px'
				}}
				className={s.input}
				id={name}
				placeholder={placeholder}
				name={name}
				value={password ? password : value}
				onChange={handleChange}
				type={isPassword ? 'password' : 'text'}
				maxLength={name === 'firstName' ? 15 : 30}
				autoComplete={'off'}
			/>
		</div>
	);
}