import OfflineRequestsDatabase from '../components/OfflineRequestsDatabase';
import MockQueue from './MockQueue';


describe('OfflineRequestsDatabase', () => {

	test('should save request', async () => {
		const request = MockQueue[0];

		await OfflineRequestsDatabase.saveRequest(request);
		const queue = await OfflineRequestsDatabase.getRequestsQueue();

		expect(queue.length).toBe(1);
	})
});