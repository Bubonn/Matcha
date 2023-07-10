// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();





















import React from 'react';
import ReactDOM from 'react-dom/client';
// import { App } from './App';
import { Signup } from './pages/Signup/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signin } from './pages/Signin/Signin';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { Age } from './pages/Age/Age';
import { Gender } from './pages/Gender/Gender';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
// 		<BrowserRouter>
// 			<Routes>
// 				<Route path='/' element={<App />} >
// 				</Route>
// 			</Routes>
// 		</BrowserRouter>
// );

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<App />} /> */}
        <Route path='/' element={<Signup />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/age' element={<Age />} />
        <Route path='/gender' element={<Gender />} />
      </Routes>
    </BrowserRouter>
  );
}
