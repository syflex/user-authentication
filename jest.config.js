module.exports = {
	clearMocks: true,
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
	roots: [
		'<rootDir>/src'
	],
	testEnvironment: 'node',
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	testTimeout: 40000
};
