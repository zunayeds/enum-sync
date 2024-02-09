import { LanguageConfigurationBase } from ".";
import { StringCasingType } from "../enums";

export const DART_CONFIGURATION: LanguageConfigurationBase = {
    nameCasing: StringCasingType.KebabCase,
    itemCasing: StringCasingType.CamelCase,
    fileExtension: 'dart'
}