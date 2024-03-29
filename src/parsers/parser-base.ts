import { LANGUAGE_CONFIG_MAPPINGS } from '../constants';
import { EnumType, Language } from '../enums';
import {
	GenericEnum,
	GenericEnumItem,
	LanguageConfigurationBase
} from '../models';

export abstract class EnumParserBase {
	protected readonly languageConfiguration: LanguageConfigurationBase;

	constructor(protected readonly language: Language) {
		this.languageConfiguration = LANGUAGE_CONFIG_MAPPINGS[this.language];
	}

	abstract parseEnumBody(enumBody: string): GenericEnumItem[];

	public parseFileContent(fileContent: string): GenericEnum[] {
		return this.parseFileContentInternal(fileContent);
	}

	protected parseFileContentInternal(fileContent: string): GenericEnum[] {
		let match;
		const parsedEnums: GenericEnum[] = [];

		while (
			(match = (
				this.languageConfiguration.enumParserRegex as RegExp
			).exec(fileContent)) !== null
		) {
			const enumName = match[1];
			const enumBody = match[2];
			const enumItems = this.parseEnumBody(enumBody);
			const enumType = this.determineEnumType(enumItems);
			parsedEnums.push({
				name: enumName,
				type: enumType,
				items: enumItems
			});
		}

		return parsedEnums;
	}

	protected determineEnumType(items: GenericEnumItem[]): EnumType {
		let hasNumber = false;
		let hasString = false;

		for (const item of items) {
			if (typeof item.value === 'number') {
				hasNumber = true;
			} else if (typeof item.value === 'string') {
				hasString = true;
			}
		}

		if (hasNumber && hasString) return EnumType.Heterogeneous;

		if (!hasNumber && hasString) return EnumType.String;

		if (hasNumber && !hasString) {
			const allNumericSequential = items.every(
				(item, index) =>
					typeof item.value === 'number' && item.value === index
			);
			if (allNumericSequential) return EnumType.General;

			const allNumeric = items.every(
				item => typeof item.value === 'number'
			);
			if (allNumeric) return EnumType.Numeric;

			return EnumType.PartiallyNumeric;
		}

		return EnumType.General;
	}
}
