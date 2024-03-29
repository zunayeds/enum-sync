import { Language, StringCasingType } from '../../enums';
import { LanguageConfigurationBase } from '../../models';

export const CSHARP_CONFIGURATION: LanguageConfigurationBase = {
	fileNameCasing: StringCasingType.PascalCase,
	nameCasing: StringCasingType.PascalCase,
	itemCasing: StringCasingType.PascalCase,
	fileExtension: 'cs',
	enumParserRegex: /enum\s+(\w+)\s*{\s*([\s\S]*?)\s*}/g,
	enumBodyParserRegex: /(\w+)\s*(?:=\s*([\w\d]+))?/g
};
