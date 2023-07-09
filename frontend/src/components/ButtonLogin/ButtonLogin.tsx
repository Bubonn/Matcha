import s from './style.module.css'

interface ButtonLoginProps {
	name: string;
	small: boolean;
	colorPink: boolean;
	isSubmit: boolean;
	onClick?: any;
}

export function ButtonLogin({ name, small, colorPink, isSubmit, onClick }: ButtonLoginProps) {
	return (
		<button
			className={s.button}
			type={isSubmit ? 'submit' : 'button'}
			onClick={onClick ? onClick : undefined}
			style={{
				width: small ? '30vw' : '310px',
				maxWidth: small ? '210px' : '310px',
				backgroundColor: colorPink ? '#FB6D6C' : '#666F80'
			}}
		>
			{name}
		</button>
	);
}
