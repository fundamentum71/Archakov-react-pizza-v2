import React from 'react';
import Categoriers from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const [categoryId, setCategoryId] = React.useState(0);
	const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });

	const sortBy = sortType.sortProperty.replace('-', '');
	const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
	const category = categoryId > 0 ? `category=${categoryId}` : '';

	const _linkDataBase = `https://62fa0e77ffd7197707e47316.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order} `;

	React.useEffect(() => {
		setIsLoading(true);
		fetch(_linkDataBase)
			.then((res) => res.json())
			.then((arr) => setItems(arr))
			.then(() => setIsLoading(false));

		window.scrollTo(0, 0);
	}, [categoryId, sortType, _linkDataBase]);

	return (
		<div className="container">
			<div className="content__top">
				<Categoriers value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
				<Sort value={sortType} onClickSort={(i) => setSortType(i)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(8)].map((_, i) => <Skeleton key={i} />)
					: items.map((item) => <PizzaBlock key={item.id} {...item} />)}
			</div>
		</div>
	);
};
export default Home;
