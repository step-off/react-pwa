module.exports = {
	setupFiles: [
		'<rootDir>/node_modules/regenerator-runtime/runtime',
		'<rootDir>/globalTestConfig.js'
	],
	testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"]
};