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
			driver: localforage.INDEXEDDB,
			storeName: this._storeName
		});
		this._db = db;
	}

	static async saveRequest(request) {
		await this.initDB();

		const {url} = request;
		const requestsInDB = await this._db.getItem(url);

		if (requestsInDB) {
			const updatedRequests = this.addOrUpdateRequest(request);
			this._db.setItem(url, updatedRequests);
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

	static getLatestRequestsFromQueue(queue) {
		const urlToRequestsMap = {};
		const latestRequests = [];

		queue.forEach(request => {
			const {url} = request;

			if (urlToRequestsMap.hasOwnProperty(url)) {
				const urlRequests = urlToRequestsMap[url];

			} else {
				urlToRequestsMap[url] = [];
			}
		});

		return latestRequests;
	}

	static addOrUpdateRequest() {

	}
}
