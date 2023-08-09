import s from './style.module.css'

interface InterestListProps {
	name: string;
	common: boolean;
}

export function InterestListProfile({ name, common }: InterestListProps) {


	return (
		<button
			type='button'
			className={s.container}
			style={{
				backgroundColor: common ? '#FB025D' : 'white',
				color: common ? 'white' : 'black'
			}}
		>
			#{name}
		</button>
	)
}