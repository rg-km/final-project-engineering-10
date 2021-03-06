import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Prerequest from './components/HOC/Prerequest';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './variables.css';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Prerequest>
			<App />
		</Prerequest>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
