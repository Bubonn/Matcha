import { Age } from './pages/Age/Age';
import { Provider } from 'react-redux';
import { Chat } from './pages/Chat/Chat';
import { Apps } from './pages/Apps/Apps';
import { Likes } from './pages/Likes/Likes';
import { Search } from './pages/Search/Search';
import { Signup } from './pages/Signup/Signup';
import { Logout } from './pages/Logout/Logout';
import { Signin } from './pages/Signin/Signin';
import { Gender } from './pages/Gender/Gender';
import { Profile } from './pages/Profile/Profile';
import { History } from './pages/History/History';
import { Settings } from './pages/Settings/Settings';
import { Interests } from './pages/Interests/Interests';
import { MainPhoto } from './pages/MainPhoto/MainPhoto';
import { UserInfo } from './components/UserInfo/UserInfo';
import { Preference } from './pages/Preference/Preference';
import { Description } from './pages/Description/Description';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';
import { VerifyAccount } from './pages/VerifyAccount/VerifyAccount';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { AdditionalsPhotos } from './pages/AdditionalsPhotos/AdditionalsPhotos';
import { VerifyTokenAccount } from './pages/VerifyTokenAccount/VerifyTokenAccount';
import { EmailResetPassword } from './pages/EmailResetPassword/EmailResetPassword';
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
						<Route path='/profile/:id' element={<Profile />} />
						<Route path='/likes' element={<Likes />} />
						<Route path='/chat' element={<Chat />} />
						<Route path='/search' element={<Search />} />
						<Route path='/history' element={<History />} />
						<Route path='/logout' element={<Logout />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='*' element={<Settings />} />
					</Route>
					<Route path='/' element={<UserInfo />} >
						<Route path='/age' element={<Age />} />
						<Route path='/gender' element={<Gender />} />
						<Route path='/preference' element={<Preference />} />
						<Route path='/description' element={<Description />} />
						<Route path='/interests' element={<Interests />} />
						<Route path='/mainPhoto' element={<MainPhoto />} />
						<Route path='/additionalsPhoto' element={<AdditionalsPhotos />} />
						<Route path='/verifyAccount' element={<VerifyAccount />} />
					</Route>
					<Route path='/signup' element={<Signup />} />
					<Route path='/signin' element={<Signin />} />
					<Route path='/resetPassword/:token' element={<ResetPassword />} />
					<Route path='/forgotPassword' element={<ForgotPassword />} />
					<Route path='/verifyTokenAccount/:token' element={<VerifyTokenAccount />} />
					<Route path='/emailResetPassword' element={<EmailResetPassword />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}
