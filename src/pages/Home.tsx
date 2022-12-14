import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import { popupList } from '../components/Sort';

import { Categories, PizzaBlock, Skeleton, Pagination, Sort } from '../components';

import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaItems } from '../redux/pizza/selectors';
import { setCategoryId, setPageCount } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { categoryId, sort, pageCount, searchValue } = useSelector(selectFilter);
	const { items, status } = useSelector(selectPizzaItems);
	const sortType = sort.sortProperty;

	const onClickCategory = React.useCallback((id: number) => {
		dispatch(setCategoryId(id));
	}, []);

	const onChangePage = (number: number) => {
		dispatch(setPageCount(number));
	};

	const getPizzas = async () => {
		const sortBy = sortType.replace('-', '');
		const order = sortType.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				pageCount: String(pageCount),
			}),
		);
	};

	//Если изменили параметры и был первый рендер;
	//React.useEffect(() => {
	//	if (isMounted.current) {
	//		const queryString = qs.stringify({
	//			sortProperty: sort.sortProperty,
	//			categoryId,
	//			pageCount,
	//		});

	//		navigate(`?${queryString}`);
	//	}
	//	isMounted.current = true;
	//}, [categoryId, sortType, pageCount]);

	//Если был первый рендер. то проверяем URL параметры и сохраняем в redux;
	//React.useEffect(() => {
	//	if (window.location.search) {
	//		const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
	//		const sort = popupList.find((obj) => obj.sortProperty === params.sortBy);

	//		dispatch(
	//			setFilters({
	//				searchValue: params.search,
	//				categoryId: Number(params.category),
	//				pageCount: Number(params.pageCount),
	//				sort: sort ? sort : popupList[0],
	//			}),
	//		);
	//		isSearch.current = true;
	//	}
	//}, []);

	//Если был ПЕРВЫЙ рендер, то запрашиваем пиццы;
	React.useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			getPizzas();
		}

		isSearch.current = false;
	}, [categoryId, sortType, searchValue, pageCount]);

	const pizzas = items.map((item: any) => <PizzaBlock key={item.id} {...item} />);
	const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onClickCategory={onClickCategory} />
				<Sort value={sort} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === 'error' ? (
				<div>
					<h2>Упс, что-то пошло не так...</h2>
					<p>Попробуйте позднее...</p>
				</div>
			) : (
				<div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
			)}

			{categoryId == 0 ? <Pagination value={pageCount} onChangePage={onChangePage} /> : ''}
		</div>
	);
};
export default Home;
