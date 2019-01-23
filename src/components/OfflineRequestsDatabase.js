import Dexie from 'dexie';

export default class OfflineRequestsDatabase {
	static _db = null;
	static _dbVersion = 1;
	static _databaseName = `${window.location.host}-offline-requests`;

	// constructor() {
	// 	if (DatabaseSingletonCreator._instance) {
	// 		return DatabaseSingletonCreator._instance;
	// 	} else {
	// 		DatabaseSingletonCreator._instance = this;
	// 	}
	// }

	static initDB() {
		if (this._db) {
			return;
		}
		var db = new Dexie("MyDatabase");

		db.version(this._dbVersion).stores({
			requests: "url, method, timestamp"
		});
		this._db = db;
	}

	static saveRequest(request) {
		this.initDB();
		this._db.requests.add(request)
	}

	static async exists() {
		return await Dexie.exists(this._databaseName);
	}

	static async delete() {
		this._db = null;
		return await Dexie.delete(this._databaseName);
	}

	static async flushRequestsQueue() {
		this.initDB();
		if (navigator.onLine) {
			console.log(this._db.requests.toArray())
		}
	}
}

// export default new DatabaseSingletonCreator();