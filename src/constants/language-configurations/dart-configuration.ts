import { EnumType, StringCasingType } from '../../enums';
import { LanguageConfigurationBase } from '../../models';

export const DART_CONFIGURATION: LanguageConfigurationBase = {
	fileNameCasing: StringCasingType.SnakeCase,
	nameCasing: StringCasingType.PascalCase,
	itemCasing: StringCasingType.CamelCase,
	supportedEnumTypes: [EnumType.General],
	fileExtension: 'dart'
};
