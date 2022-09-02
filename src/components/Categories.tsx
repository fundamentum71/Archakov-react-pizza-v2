import React from 'react';
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriersProps = {
	value: number;
	onClickCategory: (i: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categoriers: React.FC<CategoriersProps> = React.memo(({ value, onClickCategory }) => {
	//useWhyDidYouUpdate('Categoriers', { value, onClickCategory });
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

export default Categoriers;
