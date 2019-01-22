
export default class RequestService {
	static async get(url) {
		const response = await fetch(url);

		return await response.json();
	}

	static async post(url, data) {
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
	}
}