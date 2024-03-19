import { JavaScriptParser } from '../../src/parsers/javascript-parser';
import { GenericEnumItem } from '../../src/models';

describe('JavaScriptParser', () => {
	let parser: JavaScriptParser;

	beforeEach(() => {
		parser = new JavaScriptParser();
	});

	describe('parseEnumBody', () => {
		it('should parse general enum body correctly', () => {
			const enumBody = `
            VALUE1,
            VALUE2,
            VALUE3,
        `;
			const expectedEnumItems: GenericEnumItem[] = [
				{ name: 'VALUE1', value: 0 },
				{ name: 'VALUE2', value: 1 },
				{ name: 'VALUE3', value: 2 }
			];

			const parsedEnumItems = parser.parseEnumBody(enumBody);

			expect(parsedEnumItems).toEqual(expectedEnumItems);
		});

		it('should parse numeric enum body correctly', () => {
			const enumBody = `
            VALUE1 = 1,
            VALUE2 = 2,
            VALUE3 = 3,
        `;
			const expectedEnumItems: GenericEnumItem[] = [
				{ name: 'VALUE1', value: 1 },
				{ name: 'VALUE2', value: 2 },
				{ name: 'VALUE3', value: 3 }
			];

			const parsedEnumItems = parser.parseEnumBody(enumBody);

			expect(parsedEnumItems).toEqual(expectedEnumItems);
		});

		it('should parse string enum body correctly', () => {
			const enumBody = `
            VALUE1 = 'value1',
            VALUE2 = 'value2',
            VALUE3 = 'value3',
        `;
			const expectedEnumItems: GenericEnumItem[] = [
				{ name: 'VALUE1', value: 'value1' },
				{ name: 'VALUE2', value: 'value2' },
				{ name: 'VALUE3', value: 'value3' }
			];

			const parsedEnumItems = parser.parseEnumBody(enumBody);

			expect(parsedEnumItems).toEqual(expectedEnumItems);
		});

		it('should parse heterogeneous enum body correctly', () => {
			const enumBody = `
            VALUE1 = 1,
            VALUE2 = 'value2',
            VALUE3 = '3',
        `;
			const expectedEnumItems: GenericEnumItem[] = [
				{ name: 'VALUE1', value: 1 },
				{ name: 'VALUE2', value: 'value2' },
				{ name: 'VALUE3', value: '3' }
			];

			const parsedEnumItems = parser.parseEnumBody(enumBody);

			expect(parsedEnumItems).toEqual(expectedEnumItems);
		});

		it('should handle empty enum body', () => {
			const enumBody = '';

			const parsedEnumItems = parser.parseEnumBody(enumBody);

			expect(parsedEnumItems).toEqual([]);
		});
	});
});
