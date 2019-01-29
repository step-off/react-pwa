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

		const length = await this._db.length();
		const requestIndex = length + 1;

		this._db.setItem(requestIndex, request);
	}

	static async delete() {
		await this._db.clear();
		this._db = null;
	}

	static async getRequestsQueue() {
		await this.initDB();

		const queue = [];
		await this._db.iterate((value) => {
			queue.push(value);
		});

		return queue;
	}
}
