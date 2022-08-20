import React from 'react';

//for redux*************
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/slices/filterSlice';
/************/

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFoun';
import Cart from './pages/Cart';

import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

export const SearchConntext = React.createContext();

function App() {
	const [searchValue, setSearshValue] = React.useState('');

	//for redux*************
	const count = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();
	/************/
	return (
		<div className="wrapper">
			{/* for redux************* */}
			<button aria-label="Increment value" onClick={() => dispatch(increment())}>
				Increment
			</button>
			<span>{count}</span>
			<button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
				Decrement
			</button>
			{/* ***************** */}

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
