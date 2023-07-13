import { useState } from 'react';
import s from './style.module.css'

interface ButtonSideMenuProps {
	name: string;
	logo: any;
}

export function ButtonSideMenu({ name, logo }: ButtonSideMenuProps) {
	const [mouseOn, setMouseOn] = useState(false);

	return (
		<div 
			className={s.container}
			onMouseEnter={() => setMouseOn(true)}
			onMouseLeave={() => setMouseOn(false)}
			style={{backgroundColor: mouseOn ? '#000000' : '#282828'}}
		>
			<img className={s.logo} src={logo} alt='logoMenu'/>
			{name}
		</div>
	);
}