import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = React.useState<{ title: string; price: number; imageUrl: string }>();
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
		return <>Загрузка..</>;
	}
	const { title, price, imageUrl } = pizza;

	return (
		<div className="container">
			<img src={imageUrl} alt={title} />
			<h2>{title}</h2>
			<p></p>
			<h4>{price} руб.</h4>
			<Link to="/">
				<button className="button button--outline button--add">
					<span>Назад</span>
				</button>
			</Link>
		</div>
	);
};

export default FullPizza;
