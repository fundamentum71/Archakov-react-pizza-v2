import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
	const [pizza, setPizza] = React.useState();
	const { pizzaId } = useParams();
	const navigate = useNavigate();

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
		return 'Загрузка..';
	}
	const { title, price, imageUrl, sizes, types } = pizza;

	return (
		<div className="container">
			<img src={imageUrl} alt={title} />
			<h2>{title}</h2>
			<p></p>
			<h4>{price} руб.</h4>
		</div>
	);
};

export default FullPizza;
