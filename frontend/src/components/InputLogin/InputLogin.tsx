import { useState } from 'react';
import s from './style.module.css'

interface InputLoginProps {
	label: string;
	name: string;
	placeholder: string;
	small: boolean
}

export function InputLogin({ label, name, placeholder, small }: InputLoginProps) {
	const [value, setValue] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}