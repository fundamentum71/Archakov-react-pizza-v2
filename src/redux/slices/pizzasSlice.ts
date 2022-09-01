import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Sort } from './filterSlice';

type PizzaItem = {
	id: string;
	title: string;
	types: number[];
	price: number;
	sizes: number[];
	imageUrl: string;
};

enum Status {
	LOADING = 'loading',
	SUCCES = 'succes',
	ERROR = 'error',
}

interface PizzaSliceState {
	items: PizzaItem[];
	status: Status;
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING, //loading|| succes || error
};

export type SearchPizzaParams = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	pageCount: string;
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { sortBy, order, category, search, pageCount } = params;

		const { data } = await axios.get<PizzaItem[]>(
			`https://62fa0e77ffd7197707e47316.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search} `,
		);

		return data;
	},
);

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<PizzaItem[]>) {
			state.items = action.payload;
		},
	},

	//если используем TS
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = Status.LOADING;
			state.items = [];
		});

		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCES;
		});

		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},
});
export const selectPizzaItems = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
