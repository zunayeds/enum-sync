import { EnumConverterBase } from '.';
import { EnumType, Language } from '../enums';
import { StringHelper, TypeHelper } from '../utilities';
import { GenericEnum } from '../models';

export class DartConverter extends EnumConverterBase {
	constructor() {
		super(Language.Dart);
	}

	convertEnum(genericEnum: GenericEnum): string {
		let fileContent: string = '';

		if (genericEnum.type === EnumType.General) {
			fileContent += `enum ${genericEnum.name} {`;

			genericEnum.items.forEach(enumItem => {
				fileContent += `\n\t${enumItem.name},`;
			});
		} else {
			fileContent += `abstract class ${genericEnum.name} {`;

			genericEnum.items.forEach(enumItem => {
				fileContent += '\n\t';
				const isNumber = TypeHelper.isNumber(enumItem.value);
				fileContent += `static ${isNumber ? 'int' : 'String'} get ${enumItem.name} => ${isNumber ? enumItem.value : StringHelper.addQuotation(enumItem.value)};`;
			});
		}

		fileContent += '\n}';

		return fileContent;
	}
}
