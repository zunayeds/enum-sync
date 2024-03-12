import { EnumHelper } from '../../src/utilities';

describe('EnumHelper', () => {
	describe('convertToEnumObjectList', () => {
		it('should convert an enum to an array of EnumObjects', () => {
			// Arrange
			enum TestEnum {
				A = 'valueA',
				B = 'valueB'
			}

			const expected = [
				{ key: 'A', value: 'valueA' },
				{ key: 'B', value: 'valueB' }
			];

			// Act
			const result = EnumHelper.convertToEnumObjectList(TestEnum);

			// Assert
			expect(result).toEqual(expected);
		});
	});
});
