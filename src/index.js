import '@babel/polyfill';
import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App/App.jsx';
import OfflineRequestsDatabase from "./services/OfflineRequestsDatabase";
import RequestService from "./services/RequestService";

window.addEventListener('load', async () => {
	if ('serviceWorker' in navigator) {
		try {
			navigator.serviceWorker.register('service-worker.js').then(() => {
				console.log('SW registered successfully')
			}).catch((error) => {
				console.log(`Caught register error: ${error}`)
			})
		} catch (e) {
			console.log('Error with SW registration')
		}
	}
});

window.addEventListener('online', () => {
	RequestService.flushOfflineRequestsQueue();
});

ReactDOM.render(
    React.createElement(App, {}),
    document.getElementById('app')
);
