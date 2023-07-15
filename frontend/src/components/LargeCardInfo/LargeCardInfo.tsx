import s from './style.module.css'

interface LargeCardInfoProps {
	img: any;
	alt: string;
	content: string;
}

export function LargeCardInfo({ img, alt, content }: LargeCardInfoProps) {
	return (
		<div className={s.container}>
			<img className={s.img} src={img} alt={alt} />
			<span className={s.content}>{content}</span>
		</div>
	);
}