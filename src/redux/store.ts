import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import pizza from './slices/pizzasSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
	reducer: {
		filter,
		cart,
		pizza,
	},
});

//будет хранить тип стейтов
export type RootState = ReturnType<typeof store.getState>;

//тип для диспатча
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
