import React, { useContext } from 'react';

import Categoriers from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchConntext } from '../App';

const Home = () => {
	const { searchValue } = useContext(SearchConntext);

	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const [categoryId, setCategoryId] = React.useState(0);
	const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });

	const [currentPage, setCurrentPage] = React.useState(1);

	const sortBy = sortType.sortProperty.replace('-', '');
	const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
	const category = categoryId > 0 ? `category=${categoryId}` : '';
	const search = searchValue ? `&search=${searchValue}` : '';

	const _linkDataBase = `https://62fa0e77ffd7197707e47316.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search} `;

	React.useEffect(() => {
		setIsLoading(true);
		fetch(_linkDataBase)
			.then((res) => res.json())
			.then((arr) => setItems(arr))
			.then(() => setIsLoading(false));

		window.scrollTo(0, 0);
	}, [categoryId, sortType, _linkDataBase, searchValue, currentPage]);

	const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
	const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categoriers value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
				<Sort value={sortType} onClickSort={(i) => setSortType(i)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>

			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</div>
	);
};
export default Home;
