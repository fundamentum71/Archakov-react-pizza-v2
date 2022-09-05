import React from 'react';

type CategoriersProps = {
	value: number;
	onClickCategory: (i: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: React.FC<CategoriersProps> = React.memo(({ value, onClickCategory }) => {
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
});
