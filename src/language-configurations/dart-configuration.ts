import { LanguageConfigurationBase } from ".";
import { StringCasingType } from "../enums";

export const DART_CONFIGURATION: LanguageConfigurationBase = {
    fileNameCasing: StringCasingType.SnakeCase,
    nameCasing: StringCasingType.PascalCase,
    itemCasing: StringCasingType.CamelCase,
    fileExtension: 'dart'
}