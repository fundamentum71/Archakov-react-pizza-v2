import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFoun';
import Cart from './pages/Cart';

import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

function App() {
	const [searchValue, setSearshValue] = React.useState('');

	console.log(searchValue);

	return (
		<div className="wrapper">
			<Header searchValue={searchValue} setSearshValue={setSearshValue} />
			<div className="content">
				<Routes>
					<Route path="/" element={<Home searchValue={searchValue} />} />
					<Route path="*" element={<NotFound />} />
					<Route path="cart" element={<Cart />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
