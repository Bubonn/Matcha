import s from './style.module.css'

interface InputLoginProps {
	label: string;
	name: string;
	placeholder: string;
	small: boolean
}

export function InputLogin({ label, name, placeholder, small }: InputLoginProps) {
	return (
		<div className={s.test}>
			<label className={s.label} htmlFor={name} > {label} </label>
			<input
				style={{
					width: small ? '200px' : '310px'
					
				}}
				className={s.input}
				id={name}
				placeholder={placeholder}
				name={name}
			/>
		</div>
	);
}