import s from './style.module.css'

interface InterestListProps {
	name: string;
	common: boolean;
}

export function InterestListProfile({ name, common }: InterestListProps) {


	return (
		<div
			className={s.container}
			style={{
				backgroundColor: common ? '#FB025D' : 'white',
				color: common ? 'white' : 'black'
			}}
		>
			<span>#{name}</span>
		</div>
	)
}