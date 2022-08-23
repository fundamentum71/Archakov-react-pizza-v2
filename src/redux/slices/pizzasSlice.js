import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
	const { _linkDataBase } = params;
	const { data } = await axios.get(_linkDataBase);
	return data;
});

const initialState = {
	items: [],
	status: 'loading', //loading|| succes || error
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.status = 'succes';
		},

		[fetchPizzas.pending]: (state) => {
			state.status = 'loading';
			state.items = [];
		},

		[fetchPizzas.rejected]: (state) => {
			state.status = 'error';
			state.items = [];
		},
	},
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
