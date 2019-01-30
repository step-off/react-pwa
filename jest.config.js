module.exports = {
	setupFiles: [
		'<rootDir>/node_modules/regenerator-runtime/runtime',
		'<rootDir>/testing/global-test.js'
	],
	testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"]
};