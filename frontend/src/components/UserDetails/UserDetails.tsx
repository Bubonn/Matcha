import s from './style.module.css'

interface UserDetailsProps {
	img: any;
	info: string;
}

export function UserDetails({ img, info }: UserDetailsProps) {
	return (
		<div className={s.container}>
			<img className={s.img} src={img} alt='logoUserInfo'/>
			{info}
		</div>
	);
}