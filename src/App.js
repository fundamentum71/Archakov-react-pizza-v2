import React from 'react';
import Header from './components/Header';
import Categoriers from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import Skeleton from './components/PizzaBlock/Skeleton';

import './scss/app.scss';

function App() {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const _linkDataBase = 'https://62fa0e77ffd7197707e47316.mockapi.io/items';

	React.useEffect(() => {
		fetch(_linkDataBase)
			.then((res) => res.json())
			.then((arr) => setItems(arr))
			.then(() => setIsLoading(false));
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
						{isLoading
							? [...new Array(8)].map((_, i) => <Skeleton key={i} />)
							: items.map((item) => <PizzaBlock key={item.id} {...item} />)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
