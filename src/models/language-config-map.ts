import { Language } from "../enums";
import { LanguageConfigurationBase } from "./language-configuration-base";

export interface LanguageConfigMap {
    key: Language,
    config: LanguageConfigurationBase
}