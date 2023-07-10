import s from './style.module.css'

interface ButtonNextProps {
	disabled?: boolean;
}

export function ButtonNext({ disabled }: ButtonNextProps) {
	return (
		<button
			className={s.button}
			type='submit'
			disabled={disabled === true ? true : false}
			style={{
				background: disabled ? '#C3C8D3' : '#FB6D6C',
				cursor: disabled ? 'not-allowed' : 'pointer'
			}}
		>
			Next
		</button>
	);
}