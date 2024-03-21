import { CSharpParser } from '../../src/parsers';
import { GenericEnumItem } from '../../src/models';

describe('CSharpParser', () => {
	let parser: CSharpParser;

	beforeEach(() => {
		parser = new CSharpParser();
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

		it('should handle empty enum body', () => {
			const enumBody = '';

			const parsedEnumItems = parser.parseEnumBody(enumBody);

			expect(parsedEnumItems).toEqual([]);
		});
	});
});
