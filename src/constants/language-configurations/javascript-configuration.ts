import { Language, StringCasingType } from '../../enums';
import { LanguageConfigurationBase } from '../../models';
import { JavaScriptParser } from '../../parsers';

export const JAVASCRIPT_CONFIGURATION: LanguageConfigurationBase = {
	fileNameCasing: StringCasingType.CamelCase,
	nameCasing: StringCasingType.PascalCase,
	itemCasing: StringCasingType.PascalCase,
	fileExtension: 'js',
	enumParserRegex: /(?:export\s+)?enum\s+(\w+)\s*\{([^}]+)\}\s*;?/g,
	enumBodyParserRegex: /(\w+)\s*(?:=\s*([^,]+))?/g
};
