import { Signup } from './pages/Signup/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signin } from './pages/Signin/Signin';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { Age } from './pages/Age/Age';
import { Gender } from './pages/Gender/Gender';
import { Preference } from './pages/Preference/Preference';
import { Description } from './pages/Description/Description';
import { Interests } from './pages/Interests/Interests';
import { MainPhoto } from './pages/MainPhoto/MainPhoto';
import { AdditionalsPhotos } from './pages/AdditionalsPhotos/AdditionalsPhotos';
import { Apps } from './pages/Apps/Apps';
import { Profile } from './pages/Profile/Profile';
import { Likes } from './pages/Likes/Likes';
import { Search } from './pages/Search/Search';
import { History } from './pages/History/History';
import { Settings } from './pages/Settings/Settings';
import { Provider } from 'react-redux';
import store from './store';
import ReactDOM from 'react-dom/client';

const rootElement = document.getElementById('root');

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);

	root.render(
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Apps />} >
						<Route path='/profile' element={<Profile />} />
						<Route path='/likes' element={<Likes />} />
						<Route path='/search' element={<Search />} />
						<Route path='/history' element={<History />} />
						<Route path='/settings' element={<Settings />} />
					</Route>
					<Route path='/signup' element={<Signup />} />
					<Route path='/signin' element={<Signin />} />
					<Route path='/forgotPassword' element={<ForgotPassword />} />
					<Route path='/age' element={<Age />} />
					<Route path='/gender' element={<Gender />} />
					<Route path='/preference' element={<Preference />} />
					<Route path='/description' element={<Description />} />
					<Route path='/interests' element={<Interests />} />
					<Route path='/mainPhoto' element={<MainPhoto />} />
					<Route path='/additionalsPhoto' element={<AdditionalsPhotos />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}
