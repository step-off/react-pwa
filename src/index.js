import '@babel/polyfill';
import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App.jsx';
import OfflineRequestsDatabase from "./components/OfflineRequestsDatabase";

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

	const offlineDbExists = await OfflineRequestsDatabase.exists();
	if (offlineDbExists) {
		OfflineRequestsDatabase.flushRequestsQueue();
	}
});

window.addEventListener('online', () => {
	OfflineRequestsDatabase.flushRequestsQueue();
});

ReactDOM.render(
    React.createElement(App, {}),
    document.getElementById('app')
);
