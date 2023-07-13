import { useState } from 'react';
import { SideMenu } from '../../components/SideMenu/SideMenu';
import s from './style.module.css'
import { Header } from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';

export function Apps() {
	const [section, setSection] = useState<string>('Search');

	function updateSection (newSection: string){
		setSection(newSection);
	};

	return (
		<div className={s.app}>
			<SideMenu section={section} updateSection={updateSection}/>
			<div className={s.content}>
				<Header section={section} />
				<Outlet />
			</div>
		</div>
	);
}
