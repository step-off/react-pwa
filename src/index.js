import '@babel/polyfill';
import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App.jsx';

window.addEventListener('load', () => {
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

ReactDOM.render(
    React.createElement(App, {}),
    document.getElementById('app')
);
