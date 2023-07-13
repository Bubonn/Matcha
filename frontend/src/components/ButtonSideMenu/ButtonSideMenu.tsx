import s from './style.module.css'

interface ButtonSideMenuProps {
	section: any;
	updateSection: any;
	name: string;
	logo: any;
}

export function ButtonSideMenu({ section, updateSection, name, logo }: ButtonSideMenuProps) {

	return (
		<div 
			className={s.container}
			onClick={() => updateSection(name)}
			style={{backgroundColor: section === name ? '#000000' : '#282828'}}
		>
			<img className={s.logo} src={logo} alt='logoMenu'/>
			{name}
		</div>
	);
}