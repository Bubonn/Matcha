import { useEffect, useState } from 'react';
import { SideMenu } from '../../components/SideMenu/SideMenu';
import { Header } from '../../components/Header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getCookieByName } from '../../utils/auth';
import { BackApi } from '../../api/back';
import s from './style.module.css'

export function Apps() {

	const navigate = useNavigate();
	const selector = useSelector((store: RootState) => store.user.user);
	const [section, setSection] = useState<string>('Search');

	function updateSection (newSection: string){
		setSection(newSection);
	};

	async function checkToken() {
		const token: string | null = getCookieByName('token');
		console.log('TOKEN =', token);
		if (!token) {
			navigate('/signin');
		}
		else {
			const rep = await BackApi.checkToken(token);
			if (rep.status !== 200) {
				navigate('/signin');
			}
		}
	}

	useEffect(() => {
		checkToken();
	}, [section])

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
