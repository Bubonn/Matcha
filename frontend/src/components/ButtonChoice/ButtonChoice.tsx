import s from './style.module.css'

interface ButtonChoiceprops {
	name: string;
	nameSetter: string;
	choice: any;
	setChoice: any;
}

export function ButtonChoice({ name, nameSetter, choice, setChoice }: ButtonChoiceprops) {
	return (
		<div className={s.container}>
			<button
				type='button'
				className={s.button}
				onClick={() => setChoice(nameSetter)}
				style={{
					backgroundColor: choice === nameSetter ? 'rgba(251, 109, 108, 0.90)' : 'white',
					color: choice === nameSetter ? 'white' : 'black',
					fontWeight: choice === nameSetter ? '700' : '400',
				}}
			>
				{name}
			</button>
		</div>
	);
	
}
