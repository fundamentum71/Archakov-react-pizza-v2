import React from 'react';
import Header from './components/Header';
import Categoriers from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import pizzas from './assets/pizza.json';

import './scss/app.scss';

function App() {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categoriers />
						<Sort />
					</div>
					<h2 className="content__title">Все пиццы</h2>
					<div className="content__items">
						{pizzas.map((item) => (
							<PizzaBlock key={item.id} {...item} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
