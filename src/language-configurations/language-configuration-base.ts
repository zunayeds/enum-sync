import { StringCasingType } from "../enums";

export interface LanguageConfigurationBase {
    nameCasing: StringCasingType;
    itemCasing: StringCasingType;
    fileExtension: string;
}