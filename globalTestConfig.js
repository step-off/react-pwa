const memoryDriver = require('localforage-memoryStorageDriver');
const localforage = require('localforage');

localforage.defineDriver(memoryDriver);
