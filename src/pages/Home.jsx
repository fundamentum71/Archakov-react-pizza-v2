import React, { useContext } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice';
import Categoriers from '../components/Categories';
import Sort, { popupList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchConntext } from '../App';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { categoryId, sort, pageCount } = useSelector((state) => state.filter);
	const sortType = sort.sortProperty;

	const onClickCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number) => {
		dispatch(setPageCount(number));
	};

	const { searchValue } = useContext(SearchConntext);

	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const fetchPizzas = () => {
		const sortBy = sortType.replace('-', '');
		const order = sortType.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';
		const _linkDataBase = `https://62fa0e77ffd7197707e47316.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search} `;

		setIsLoading(true);

		axios
			.get(_linkDataBase)
			.then((response) => setItems(response.data))
			.then(() => setIsLoading(false));
	};

	//Если изменили параметры и был первый рендер;
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				pageCount,
			});

			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sortType, pageCount]);

	//Если был первый рендер. то проверяем URL параметры и сохраняем в redux;
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = popupList.find((obj) => obj.sortProperty === params.sortProperty);
			dispatch(
				setFilters({
					...params,
					sort,
				}),
			);
			isSearch.current = true;
		}
	}, []);

	//Если был ПЕРВЫЙ рендер, то запрашиваем пиццы;
	React.useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			fetchPizzas();
		}

		isSearch.current = false;
	}, [categoryId, sortType, searchValue, pageCount]);

	const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
	const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categoriers value={categoryId} onClickCategory={onClickCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>

			<Pagination value={pageCount} onChangePage={onChangePage} />
		</div>
	);
};
export default Home;
