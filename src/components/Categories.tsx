import React from 'react';

type CategoriersProps = {
	value: number;
	onClickCategory: any;
};

const Categoriers: React.FC<CategoriersProps> = ({ value, onClickCategory }) => {
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

	return (
		<div className="categories">
			<ul>
				{categories.map((item, i) => (
					<li key={i} className={value === i ? 'active' : ''} onClick={() => onClickCategory(i)}>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categoriers;