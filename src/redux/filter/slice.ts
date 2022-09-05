import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, Sort, SortPropertyEnum } from './types';

const initialState: FilterSliceState = {
	searchValue: '',
	categoryId: 0,
	pageCount: 1,
	sort: {
		name: 'популярности',
		sortProperty: SortPropertyEnum.RETING_DESC,
	},
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload;
		},
		setPageCount(state, action: PayloadAction<number>) {
			state.pageCount = action.payload;
		},

		setFilters(state, action: PayloadAction<FilterSliceState>) {
			if (Object.keys(action.payload).length) {
				state.pageCount = Number(action.payload.pageCount);
				state.sort = action.payload.sort;
				state.categoryId = Number(action.payload.categoryId);
			} else {
				state.pageCount = 1;
				state.categoryId = 0;
				state.sort = {
					name: 'популярности',
					sortProperty: SortPropertyEnum.RETING_DESC,
				};
			}
		},
	},
});

export const { setCategoryId, setSort, setPageCount, setFilters, setSearchValue } =
	filterSlice.actions;

export default filterSlice.reducer;
