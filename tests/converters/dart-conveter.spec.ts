import { DartConverter } from '../../src/converters';
import { EnumType } from '../../src/enums';
import { GenericEnum } from '../../src/models';
import { FileService } from '../../src/services';
import { DART_CONFIGURATION } from '../../src/constants/language-configurations';

describe('DartConverter', () => {
	let converter: DartConverter;

	beforeEach(() => {
		converter = new DartConverter();
	});

	describe('convertEnumsToFiles', () => {
		it('should convert a list of generic enums to a list of code files', () => {
			const genericEnums: GenericEnum[] = [
				{
					name: 'TestEnum',
					type: EnumType.General,
					items: [
						{ name: 'Item1', value: '1' },
						{ name: 'Item2', value: '2' }
					]
				}
			];

			const result = converter.convertEnumsToFiles(genericEnums);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(genericEnums.length);
			result.forEach((file, index) => {
				expect(file.fileName).toBe(
					FileService.generateFileName(
						genericEnums[index].name,
						DART_CONFIGURATION
					)
				);
				expect(file.fileContent).toContain(
					`enum ${genericEnums[index].name} {`
				);
				genericEnums[index].items.forEach(item => {
					expect(file.fileContent).toContain(`\n\t${item.name},`);
				});
				expect(file.fileContent).toContain('\n}');
			});
		});
	});

	describe('convertEnum', () => {
		it('should convert a generic enum to a string', () => {
			const genericEnum: GenericEnum = {
				name: 'TestEnum',
				type: EnumType.General,
				items: [
					{ name: 'Item1', value: '1' },
					{ name: 'Item2', value: '2' }
				]
			};

			const result = converter.convertEnum(genericEnum);

			expect(result).toContain(`enum ${genericEnum.name} {`);
			genericEnum.items.forEach(item => {
				expect(result).toContain(`\n\t${item.name},`);
			});
			expect(result).toContain('\n}');
		});

		it('should convert an abstract class enum with string values correctly', () => {
			const heterogeneous: GenericEnum = {
				type: EnumType.Heterogeneous,
				name: 'Color',
				items: [
					{ name: 'Red', value: 'Red' },
					{ name: 'Green', value: 2 },
					{ name: 'Blue', value: 'Blue' }
				]
			};

			const expectedOutput = `abstract class Color {\n\tstatic String get Red => "Red";\n\tstatic int get Green => 2;\n\tstatic String get Blue => "Blue";\n}`;

			const result = converter.convertEnum(heterogeneous);

			expect(result).toBe(expectedOutput);
		});
	});
});
