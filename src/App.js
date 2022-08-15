import React from 'react';
import Header from './components/Header';
import Categoriers from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import './scss/app.scss';

function App() {
	const [items, setItems] = React.useState([]);
	const _linkBackEnd = 'https://62fa0e77ffd7197707e47316.mockapi.io/items';

	React.useEffect(() => {
		fetch(_linkBackEnd)
			.then((res) => res.json())
			.then((arr) => {
				setItems(arr);
			});
	}, []);

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
						{items.map((item) => (
							<PizzaBlock key={item.id} {...item} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
