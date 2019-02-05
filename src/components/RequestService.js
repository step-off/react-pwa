import OfflineRequestsDatabase from "./OfflineRequestsDatabase";

export default class RequestService {
	static _headers = {
		"Content-type": "application/json; charset=UTF-8"
	};

	static async get(url) {
		const response = await fetch(url);

		return await response.json();
	}

	static async post(url, payload) {
		return this.fetch(url, payload, 'POST');
	}

	static async put(url, payload) {
		return this.fetch(url, payload, 'PUT');
	}

	static async patch(url, payload) {
		return this.fetch(url, payload, 'PATCH');
	}

	static async delete(url, payload) {
		return this.fetch(url, payload, 'DELETE');
	}

	static async fetch(url, payload, method) {
		if (navigator.onLine) {
			return await fetch(url, {
				method,
				body: JSON.stringify(payload),
				headers: this._headers
			})
		} else {
			return await OfflineRequestsDatabase.saveRequest({
				url,
				payload,
				method,
				timestamp: Date.now()
			})
		}
	}

	static async flushOfflineRequestsQueue() {
		const queue = await OfflineRequestsDatabase.getRequestsQueue();

		await Promise.all(queue.map(request => this.fetch(request.url, request.payload, request.method)));

		await OfflineRequestsDatabase.delete();
	}
}