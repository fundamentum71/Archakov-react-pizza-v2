import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CartItem } from '../redux/cart/types';
import { addItem } from '../redux/cart/slice';

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = React.useState<{
		id: string;
		title: string;
		types: number[];
		price: number;
		sizes: number[];
		count: number;
		imageUrl: string;
	}>();
	const { pizzaId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const typeNames = ['Тонкое', 'Традиционное'];
	const [activeType, setActiveType] = React.useState(0);
	const [activeSize, setActiveSize] = React.useState(0);

	React.useEffect(() => {
		async function fetchPizzas() {
			try {
				const { data } = await axios.get(
					`https://62fa0e77ffd7197707e47316.mockapi.io/items/${pizzaId}`,
				);
				setPizza(data);
			} catch (error) {
				alert('Ошибка при получении пиццы');
				navigate('/');
			}
		}
		fetchPizzas();
	}, []);

	if (!pizza) {
		return <>Загрузка..</>;
	}
	const { title, price, imageUrl, types, sizes, id } = pizza;

	const onClickAdd = () => {
		const item: CartItem = {
			id,
			title,
			price,
			imageUrl,
			type: typeNames[activeType],
			size: sizes[activeSize],
			count: 0,
		};
		dispatch(addItem(item));
	};

	return (
		<div className="container">
			<div className="container__fullpizza">
				<img className="fullpizza__img" src={imageUrl} alt={title} />
				<div className="fullpizza__desc">
					<h2>{title}</h2>
					<p>Очень вкусная пизза</p>

					<div className="pizza-block-wrapper">
						<div className="pizza-block">
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
								<div className="pizza-block__price">от {price} ₽</div>
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
								</button>
							</div>
						</div>
					</div>

					<Link to="/">
						<button className="button button--outline button--add">
							<span>Назад</span>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default FullPizza;
