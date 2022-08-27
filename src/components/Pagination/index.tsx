import React from 'react';
import ReactPaginate from 'react-paginate';

import stylePagination from './Pagination.module.scss';

type PaginationProps = {
	value: number;
	onChangePage: any;
};

const Pagination: React.FC<PaginationProps> = ({ value, onChangePage }) => {
	return (
		<ReactPaginate
			className={stylePagination.root}
			breakLabel="..."
			nextLabel=">"
			onPageChange={(event) => onChangePage(event.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={value - 1}
			previousLabel="<"
		/>
	);
};

export default Pagination;
