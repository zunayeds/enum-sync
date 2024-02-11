import { EnumConverterBase } from "../converters";
import { StringCasingType } from "../enums";
import { EnumParserBase } from "../parsers";

export interface LanguageConfigurationBase {
    fileNameCasing: StringCasingType;
    nameCasing: StringCasingType;
    itemCasing: StringCasingType;
    fileExtension: string;
    enumParser?: EnumParserBase,
    enumConverter?: EnumConverterBase,
}