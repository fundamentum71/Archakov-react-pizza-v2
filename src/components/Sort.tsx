import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, setSort, Sort, SortPropertyEnum } from '../redux/slices/filterSlice';

type PopupItem = {
	name: string;
	sortProperty: SortPropertyEnum;
};

type PopupClick = MouseEvent & {
	path: Node[];
};

type SortPopupProps = {
	value: Sort;
};

export const popupList: PopupItem[] = [
	{ name: 'популярности (убыв.)', sortProperty: SortPropertyEnum.RETING_DESC },
	{ name: 'популярности (возр.)', sortProperty: SortPropertyEnum.RETING_ASC },
	{ name: 'цене (убыв.)', sortProperty: SortPropertyEnum.PRICE_DESC },
	{ name: 'цене (возр.)', sortProperty: SortPropertyEnum.PRICE_ASC },
	{ name: 'алфавиту (убыв.)', sortProperty: SortPropertyEnum.TITLE_DESC },
	{ name: 'алфавиту (возр.)', sortProperty: SortPropertyEnum.TITLE_ASC },
];

const SortPopup: React.FC<SortPopupProps> = React.memo(({ value }) => {
	const dispatch = useDispatch();
	//const sort = useSelector(selectSort);

	const sortRef = React.useRef<HTMLDivElement>(null);

	const [isVisablePopup, setIsVisablePopup] = React.useState(false);

	const onClickListItem = (obj: PopupItem) => {
		dispatch(setSort(obj));
		setIsVisablePopup(false);
	};

	React.useEffect(() => {
		//функция для того чтобы можно было очистить обработчик
		const handleClickOutside = (event: MouseEvent) => {
			//лайвхак, чтобы убрать ошибку
			const _event = event as PopupClick;
			//*********** */
			if (sortRef.current && !_event.path.includes(sortRef.current)) {
				setIsVisablePopup(false);
			}
		};

		document.body.addEventListener('click', handleClickOutside);

		//вызовится когда будет анмаунт
		return () => document.body.removeEventListener('click', handleClickOutside);
	}, []);

	return (
		<div ref={sortRef} className="sort">
			<div className="sort__label">
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setIsVisablePopup(!isVisablePopup)}>{value.name}</span>
			</div>
			{isVisablePopup && (
				<div className="sort__popup">
					<ul>
						{popupList.map((item, i) => (
							<li
								key={i}
								onClick={() => onClickListItem(item)}
								className={value.sortProperty === item.sortProperty ? 'active' : ''}>
								{item.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
});

export default SortPopup;
