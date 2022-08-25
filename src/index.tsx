//import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

//for redux*************
import { store } from './redux/store';
import { Provider } from 'react-redux';
/************/

//Для TS
const rootElem = document.getElementById('root');
if (rootElem) {
	const root = ReactDOM.createRoot(rootElem);

	root.render(
		<BrowserRouter>
			<Provider store={store}>
				{/*<React.StrictMode>*/}
				<App />
				{/*</React.StrictMode>*/}
			</Provider>
		</BrowserRouter>,
	);
}
