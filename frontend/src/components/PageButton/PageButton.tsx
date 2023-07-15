import s from './style.module.css'

interface PageButtonProps {
	name: string;
	selected: boolean;
	changeChoice: any;
}

export function PageButton({ name, selected, changeChoice }: PageButtonProps) {
	return (
		<div
			className={s.container}
			onClick={() => changeChoice(name)}
			style={{backgroundColor: selected ? '#FB025D' : '#282828'}}
		>
			{name}
		</div>
	);
}