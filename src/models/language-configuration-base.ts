import { EnumType, StringCasingType } from '../enums';

export interface LanguageConfigurationBase {
	fileNameCasing: StringCasingType;
	nameCasing: StringCasingType;
	itemCasing: StringCasingType;
	fileExtension: string;
	supportedEnumTypes: EnumType[];
	enumParserRegex?: RegExp;
	enumBodyParserRegex?: RegExp;
}
