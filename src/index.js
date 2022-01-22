import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path='/:pair' index element={<App />}></Route>
			<Route path='*' element={<Navigate to='/ethbtc' />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById('root'),
);
