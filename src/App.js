import React from 'react';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFoun';
import Cart from './pages/Cart';

import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

export const SearchConntext = React.createContext();

function App() {
	const [searchValue, setSearshValue] = React.useState('');

	return (
		<div className="wrapper">
			<SearchConntext.Provider value={{ searchValue, setSearshValue }}>
				<Header />
				<div className="content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="*" element={<NotFound />} />
						<Route path="cart" element={<Cart />} />
					</Routes>
				</div>
			</SearchConntext.Provider>
		</div>
	);
}

export default App;
