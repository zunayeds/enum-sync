import { TypeHelper } from '../../src/utilities';

describe('TypeHelper', () => {
	describe('isNumber', () => {
		it('should return true if the value is a number', () => {
			// Arrange
			const value = 123;

			// Act
			const result = TypeHelper.isNumber(value);

			// Assert
			expect(result).toBe(true);
		});

		it('should return false if the value is not a number', () => {
			// Arrange
			const value = '123';

			// Act
			const result = TypeHelper.isNumber(value);

			// Assert
			expect(result).toBe(false);
		});
	});
});
