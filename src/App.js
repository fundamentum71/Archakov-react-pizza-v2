import React from 'react';
import Header from './components/Header';
import Categoriers from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import './scss/app.scss';

function App() {
	return (
		<div class="wrapper">
			<Header />
			<div class="content">
				<div class="container">
					<div class="content__top">
						<Categoriers />
						<Sort />
					</div>
					<h2 class="content__title">Все пиццы</h2>
					<div class="content__items">
						<PizzaBlock title="Мексиканская" price="500" />
						<PizzaBlock test="222" title="500" price="600" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
