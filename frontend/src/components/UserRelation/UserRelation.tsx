import s from './style.module.css'

export function UserRelation({ text }: { text: string }) {

	const len = (text.length) * 7;

	return (
		<div
			className={s.container}
			style={{width: `${len}px`}}
		>
			{text}
		</div>
	);
}

