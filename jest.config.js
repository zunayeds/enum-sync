module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverageFrom: [
		'src/**/*.{js,ts}',
		'!src/**/index.ts',
		'!src/constants/**/*.ts',
		'!src/enums/**/*.ts'
	]
};
