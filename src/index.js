import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

//for redux*************
import { store } from './redux/store';
import { Provider } from 'react-redux';
/************/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Provider store={store}>
			{/*<React.StrictMode>*/}
			<App />
			{/*</React.StrictMode>*/}
		</Provider>
	</BrowserRouter>,
);
