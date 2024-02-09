import { LanguageConfigurationBase } from ".";
import { StringCasingType } from "../enums";

export const JAVASCRIPT_CONFIGURATION: LanguageConfigurationBase = {
    nameCasing: StringCasingType.PascalCase,
    itemCasing: StringCasingType.PascalCase,
    fileExtension: 'js'
}