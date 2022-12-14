import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(() => import(/* webpackChunkName: 'Cart'*/ './pages/Cart'));
const NotFound = React.lazy(() => import(/* webpackChunkName: 'NotFound'*/ './pages/NotFound'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: 'FullPizza'*/ './pages/FullPizza'));

function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Home />} />
				<Route
					path="*"
					element={
						<Suspense>
							<NotFound />
						</Suspense>
					}
				/>
				<Route
					path="cart"
					element={
						<Suspense fallback={<div>Загрузка...</div>}>
							<Cart />
						</Suspense>
					}
				/>
				{/* После : нужно указать переменную */}
				<Route
					path="pizza/:pizzaId"
					element={
						<Suspense>
							<FullPizza />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
