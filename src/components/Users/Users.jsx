import React from 'react';

import RequestService from "../../services/RequestService";

export default class Users extends React.Component {
	usersUrl = 'https://reqres.in/api/users';
	state = {
		users: [],
		userName: '',
		userJob: ''
	};

	render() {
		return (
			<>
				<ul>
					{this.state.users.map(user => <li key={user.id}>{`${user.first_name} ${user.last_name}`}</li>)}
				</ul>
				<div>
					<div className={'inputsGroup'}>
						<div className={'inputWrapper'}>
							<label htmlFor="userNameInput">
								<div>
									Enter user name
								</div>
								<input type="text" id="userNameInput" value={this.state.userName}
								       onChange={this.handleNameChange}/>
							</label>
						</div>
						<div className={'inputWrapper'}>
							<label htmlFor="userJobInput">
								<div>
									Enter user job
								</div>
								<input type="text" id="userJobInput" value={this.state.userJob}
								       onChange={this.handleJobChange}/>
							</label>
						</div>
					</div>
					<button type={'button'} onClick={this.postUsers}>
						Post user
					</button>
					<button type={'button'} onClick={this.patchUsers}>
						Patch user
					</button>
					<button type={'button'} onClick={this.putUsers}>
						Put user
					</button>
					<button type={'button'} onClick={this.deleteUsers}>
						Delete user
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
		return await this.sendUsersRequest('POST');
	};

	patchUsers = async () => {
		return await this.sendUsersRequest('PATCH');
	};

	putUsers = async () => {
		return await this.sendUsersRequest('PUT');
	};

	deleteUsers = async () => {
		return await this.sendUsersRequest('DELETE');
	};

	sendUsersRequest = async (method) => {
		const {userName, userJob} = this.state;

		try {
			switch (method) {
				case 'POST':
					await RequestService.post(this.usersUrl, {
						name: userName,
						job: userJob
					});
					break;
				case 'PUT':
					await RequestService.put(this.usersUrl, {
						name: userName,
						job: userJob
					});
					break;
				case 'PATCH':
					await RequestService.patch(this.usersUrl, {
						name: userName,
						job: userJob
					});
					break;
				case 'DELETE':
					await RequestService.delete(this.usersUrl, {
						name: userName,
						job: userJob
					});
					break;
			}

			this.setState({
				userName: '',
				userJob: ''
			})
		} catch (e) {
			console.log('Error with posting users');
		}
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