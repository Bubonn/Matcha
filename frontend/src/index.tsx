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
import { Signup } from './components/Signup/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
      </Routes>
    </BrowserRouter>
  );
}
