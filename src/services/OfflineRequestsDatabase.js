import localforage from 'localforage';

export default class OfflineRequestsDatabase {
	static _db = null;
	static _databaseName = `${window.location.host}-offlineDB`;
	static _storeName = 'requestsStore';

	static async initDB() {
		if (this._db) {
			return;
		}
		const db = await localforage.createInstance({
			name: this._databaseName,
			storeName: this._storeName
		});
		this._db = db;
	}

	static async saveRequest(request) {
		await this.initDB();

		const {url} = request;
		const requestsInDBWithSameUrl = await this._db.getItem(url);

		if (requestsInDBWithSameUrl) {
			const updatedRequestsList = this.addOrUpdateRequest(request, requestsInDBWithSameUrl);
			this._db.setItem(url, updatedRequestsList);
		} else {
			this._db.setItem(url, [request]);
		}
	}

	static async delete() {
		await this._db.clear();
		this._db = null;
	}

	static async getRequestsQueue() {
		await this.initDB();

		let queue = [];
		await this._db.iterate((value) => {
			queue = queue.concat(value);
		});

		return queue;
	}

	static addOrUpdateRequest(requestToAdd, requestsInDB) {
		const staleRequestWithSameMethodInDB = requestsInDB.find(
			i => (
				i.method === requestToAdd.method &&
					i.timestamp < requestToAdd.timestamp
			)
		);

		if (staleRequestWithSameMethodInDB) {
			return [
				...requestsInDB.filter(i => i !== staleRequestWithSameMethodInDB),
				requestToAdd
			];
		} else {
			return [...requestsInDB, requestToAdd];
		}
	}
}
