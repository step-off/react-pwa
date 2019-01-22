import React from 'react';

import './App.css';

export default class App extends React.Component {
	usersUrl = 'https://reqres.in/api/users';
	state = {
		users: []
	};

	render() {
		return (
			<>
				<h1>
					React PWA
				</h1>
				<ul>
					{this.state.users.map(user => <li key={user.id}>{`${user.first_name} ${user.last_name}`}</li>)}
				</ul>
				<div>
					<button type={'button'} onClick={this.postUsers}>
						Post users
					</button>
				</div>
			</>
		)
	}

	async componentDidMount() {
		const fetchedUsers = await this.fetchUsers();

		this.setState({
			users: fetchedUsers.data
		});
	}

	fetchUsers = async () => {
		const response = await fetch(this.usersUrl);

		return response.json();
	};

	postUsers = async () => {
		await fetch(this.usersUrl, {
			method: 'POST',
			body: JSON.stringify({
				name: "morpheus",
				job: "leader"
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
	};
}
