import React from 'react';

import './App.css';
import RequestService from "./RequestService";

export default class App extends React.Component {
	usersUrl = 'https://reqres.in/api/users';
	state = {
		users: [],
		userName: '',
		userJob: ''
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
					<div className={'inputsGroup'}>
						<div className={'inputWrapper'}>
							<label for="userNameInput">
								<div>
									Enter user name
								</div>
								<input type="text" id="userNameInput" value={this.state.userName} onChange={this.handleNameChange}/>
							</label>
						</div>
						<div className={'inputWrapper'}>
							<label for="userJobInput">
								<div>
									Enter user job
								</div>
								<input type="text" id="userJobInput" value={this.state.userJob} onChange={this.handleJobChange}/>
							</label>
						</div>
					</div>
					<button type={'button'} onClick={this.postUsers}>
						Post user
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
		return await RequestService.get(this.usersUrl);
	};

	postUsers = async () => {
		const {userName, userJob} = this.state;

		await RequestService.post(this.usersUrl, {
			name: userName,
			job: userJob
		})
	};

	handleNameChange = event => {
		const {value} = event.target;

		this.setState({
			userName: value
		})
	};

	handleJobChange = event => {
		const {value} = event.target;

		this.setState({
			userJob: value
		})
	};
}
