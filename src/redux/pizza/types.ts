export type PizzaItem = {
	id: string;
	title: string;
	types: number[];
	price: number;
	sizes: number[];
	imageUrl: string;
};

export enum Status {
	LOADING = 'loading',
	SUCCES = 'succes',
	ERROR = 'error',
}

export interface PizzaSliceState {
	items: PizzaItem[];
	status: Status;
}
export type SearchPizzaParams = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	pageCount: string;
};
