 import OfflineRequestsDatabase from '../components/OfflineRequestsDatabase';
import MockRequests from './MockRequests';


describe('OfflineRequestsDatabase', () => {
	afterEach( async () => {
		await OfflineRequestsDatabase.delete();
	});

	test('should save request', async () => {
		const request = MockRequests[0];
		
		await OfflineRequestsDatabase.saveRequest(request);
		const queue = await OfflineRequestsDatabase.getRequestsQueue();

		expect(queue.length).toBe(1);
	});

	test('should store different requests with same url', async () => {
		const clientsPostRequest = MockRequests.find(i => i.method === 'POST' && i.url === '/api/clients');
		const clientsPatchRequest = MockRequests.find(i => i.method === 'PATCH' && i.url === '/api/clients');

		await OfflineRequestsDatabase.saveRequest(clientsPostRequest);
		await OfflineRequestsDatabase.saveRequest(clientsPatchRequest);
		const queue = await OfflineRequestsDatabase.getRequestsQueue();

		expect(queue).toHaveLength(2);
	});

	test('should replace request with same method and url', async () => {
		const clientsPostRequest = MockRequests[0];
		const anotherClientsPostRequest = MockRequests[1];

		await OfflineRequestsDatabase.saveRequest(clientsPostRequest);
		await OfflineRequestsDatabase.saveRequest(anotherClientsPostRequest);
		const queue = await OfflineRequestsDatabase.getRequestsQueue();

		expect(queue.length).toBe(1);
		expect(queue[0].payload).toBe('latest payload');
	});

	test('should save latest requests', async () => {
		for await (const request of MockRequests) {
			await OfflineRequestsDatabase.saveRequest(request);
		}

		const queue = await OfflineRequestsDatabase.getRequestsQueue();

		expect(queue).toHaveLength(MockRequests.length - 2);
	})
});