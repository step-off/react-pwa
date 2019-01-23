import OfflineRequestsDatabase from "./OfflineRequestsDatabase";

export default class RequestService {
	static async get(url) {
		const response = await fetch(url);

		return await response.json();
	}

	static async post(url, payload) {
		if (navigator.onLine) {
			return await fetch(url, {
				method: 'POST',
				body: JSON.stringify(payload),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			})
		} else {
			return await OfflineRequestsDatabase.saveRequest({
				url,
				payload,
				method: 'POST',
				timestamp: Date.now()
			})
		}
	}
}