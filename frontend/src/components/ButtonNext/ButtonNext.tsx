import s from './style.module.css'

export function ButtonNext() {
	return (
		<button
			className={s.button}
			type='submit'
		>
			Next
		</button>
	);
}