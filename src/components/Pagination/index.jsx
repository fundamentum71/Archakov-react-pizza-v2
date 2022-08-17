import React from 'react';
import ReactPaginate from 'react-paginate';

import stylePagination from './Pagination.module.scss';

const Pagination = () => {
	return (
		<ReactPaginate
			className={stylePagination.root}
			breakLabel="..."
			nextLabel=">"
			onPageChange={(event) => console.log(event)}
			pageRangeDisplayed={8}
			pageCount={3}
			previousLabel="<"
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;
