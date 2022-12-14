import React from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Link } from 'react-router-dom';
import { selectCartItemById } from '../../redux/cart/selectors';
import { addItem } from '../../redux/cart/slice';
import { CartItem } from '../../redux/cart/types';

type PizzaBlockProps = {
	id: string;
	title: string;
	types: number[];
	price: number;
	sizes: number[];
	count: number;
	imageUrl: string;
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
	id,
	title,
	price,
	imageUrl,
	sizes,
	types,
}) => {
	const typeNames = ['Тонкое', 'Традиционное'];
	const dispatch = useDispatch();
	const cartItem = useSelector(selectCartItemById(id));
	const [activeType, setActiveType] = React.useState(0);
	const [activeSize, setActiveSize] = React.useState(0);
	//const [activePrice, setActivePrice] = React.useState(price); //для изменения цены зависящий от радиуса

	const nowPriceFunction = (price: number, activeSize: number) => {
		switch (activeSize) {
			case 0:
				return price;
			case 1:
				return (price = price + 75);
			case 2:
				return (price = price + 120);

			default:
				{
					console.log('что-то не так в switch');
				}
				break;
		}
	};

	const addedCount = cartItem ? cartItem.count : 0;

	const onClickAdd = () => {
		const nowPrice = nowPriceFunction(price, activeSize);
		console.log('nowPrice:', nowPrice);
		const item: CartItem = {
			id,
			title,
			price: nowPrice ? nowPrice : 0,
			imageUrl,
			type: typeNames[activeType],
			size: sizes[activeSize],
			count: 0,
		};
		dispatch(addItem(item));
	};

	return (
		<div className="pizza-block-wrapper">
			<div className="pizza-block">
				<Link key={id} to={`/pizza/${id}`}>
					<img className="pizza-block__image" src={imageUrl} alt="Pizza" />
					<h4 className="pizza-block__title">{title}</h4>
				</Link>
				<div className="pizza-block__selector">
					<ul>
						{types.map((item) => (
							<li
								onClick={() => setActiveType(item)}
								className={activeType === item ? 'active' : ''}
								key={item}>
								{typeNames[item]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((value, i) => (
							<li
								onClick={() => setActiveSize(i)}
								className={activeSize === i ? 'active' : ''}
								key={i}>
								{value} см.
							</li>
						))}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">от {nowPriceFunction(price, activeSize)} ₽</div>
					<button onClick={onClickAdd} className="button button--outline button--add">
						<svg
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
								fill="white"
							/>
						</svg>
						<span>Добавить</span>
						{addedCount > 0 && <i>{addedCount}</i>}
					</button>
				</div>
			</div>
		</div>
	);
};
