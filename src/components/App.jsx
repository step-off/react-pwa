import React from 'react';

export default class App extends React.Component {
	usersUrl = 'https://jsonplaceholder.typicode.com/users';
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
					{this.state.users.map(user => <li key={user.id}>{user.name}</li>)}
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
			users: fetchedUsers
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
				username: 'Random User'
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
	};
}
