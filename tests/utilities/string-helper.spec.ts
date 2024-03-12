import { StringHelper } from '../../src/utilities';

describe('StringHelper', () => {
	describe('isNullOrWhitespace', () => {
		it('should return true if the string is null or whitespace', () => {
			expect(StringHelper.isNullOrWhitespace('')).toBe(true);
			expect(StringHelper.isNullOrWhitespace(' ')).toBe(true);
			const nullableString: string | null = null;
			expect(
				StringHelper.isNullOrWhitespace(
					nullableString as unknown as string
				)
			).toBe(true);
		});

		it('should return false if the string is not null or whitespace', () => {
			expect(StringHelper.isNullOrWhitespace('test')).toBe(false);
		});
	});

	describe('convertToCamelCase', () => {
		it('should convert the string to camel case', () => {
			expect(StringHelper.convertToCamelCase('test string')).toBe(
				'testString'
			);
		});
	});

	describe('convertToPascalCase', () => {
		it('should convert the string to pascal case', () => {
			expect(StringHelper.convertToPascalCase('test string')).toBe(
				'TestString'
			);
		});
	});

	describe('convertToKebabCase', () => {
		it('should convert the string to kebab case', () => {
			expect(StringHelper.convertToKebabCase('test string')).toBe(
				'test-string'
			);
		});
	});

	describe('convertToSnakeCase', () => {
		it('should convert the string to snake case', () => {
			expect(StringHelper.convertToSnakeCase('test string')).toBe(
				'test_string'
			);
		});
	});
});
