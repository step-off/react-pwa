const memoryDriver = require('localforage-memoryStorageDriver');
const localforage = require('localforage');

import OfflineRequestsDatabase from '../components/OfflineRequestsDatabase';
import MockQueue from './MockQueue';


describe('OfflineRequestsDatabase', () => {
	beforeAll(async () => {
		await localforage.defineDriver(memoryDriver);
	});

	afterAll(async () => {
		return await localforage.clear();
	});

	test('should save request', async () => {
		const request = MockQueue[0];
		
		await OfflineRequestsDatabase.saveRequest(request);
		const queue = await OfflineRequestsDatabase.getRequestsQueue();

		expect(queue.length).toBe(1);
	})
});