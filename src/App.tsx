import Home from './pages/Home';
import NotFound from './pages/NotFoun';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';

import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Home />} />
				<Route path="*" element={<NotFound />} />
				<Route path="cart" element={<Cart />} />
				{/* После : нужно указать переменную */}
				<Route path="pizza/:pizzaId" element={<FullPizza />} />
			</Route>
		</Routes>
	);
}

export default App;
