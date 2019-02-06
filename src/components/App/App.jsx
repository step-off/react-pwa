import React from 'react';

import './App.css';
import Users from "../Users/Users";

export default class App extends React.Component {
	render() {
		return (
			<>
				<h1>
					React PWA
				</h1>
				<Users />
			</>
		)
	}
}
