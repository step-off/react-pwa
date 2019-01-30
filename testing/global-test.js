import localforage from 'localforage';
import memoryStorageDriver from 'localforage-memoryStorageDriver';

localforage.defineDriver(memoryStorageDriver).then(function() {
	return localforage.setDriver(memoryStorageDriver._driver);
});