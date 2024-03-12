import { StringCasingType } from '../enums';

export interface LanguageConfigurationBase {
	fileNameCasing: StringCasingType;
	nameCasing: StringCasingType;
	itemCasing: StringCasingType;
	fileExtension: string;
	enumParserRegex?: RegExp;
	enumBodyParserRegex?: RegExp;
}
