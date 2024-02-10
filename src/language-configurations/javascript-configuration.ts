import { LanguageConfigurationBase } from ".";
import { StringCasingType } from "../enums";

export const JAVASCRIPT_CONFIGURATION: LanguageConfigurationBase = {
    fileNameCasing: StringCasingType.CamelCase,
    nameCasing: StringCasingType.PascalCase,
    itemCasing: StringCasingType.PascalCase,
    fileExtension: 'js'
}