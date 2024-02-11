import { Language } from "../enums";
import { LanguageConfigMapType } from "../types";
import { DART_CONFIGURATION, JAVASCRIPT_CONFIGURATION, TYPESCRIPT_CONFIGURATION } from "./language-configurations";

export const LANGUAGE_CONFIG_MAPPINGS: LanguageConfigMapType = {
    [Language.JavaScript]: JAVASCRIPT_CONFIGURATION,
    [Language.TypeScript]: TYPESCRIPT_CONFIGURATION,
    [Language.Dart]: DART_CONFIGURATION,
}