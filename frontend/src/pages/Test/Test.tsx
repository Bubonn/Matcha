import { SideMenu } from '../../components/SideMenu/SideMenu';
import s from './style.module.css'

export function Test() {
	return (
		<div className={s.app}>
			<SideMenu />
			{/* <aside className={s.sidebar}>Sidebar</aside> */}
			<div className={s.content}>
				<header className={s.header}>Header</header>
				<main className={s.mainContent}>Main Content</main>
			</div>
		</div>
	);
}
