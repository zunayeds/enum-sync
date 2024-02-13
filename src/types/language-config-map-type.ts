import { Language } from '../enums';
import { LanguageConfigurationBase } from '../models';

export type LanguageConfigMapType = {
	[key in Language]: LanguageConfigurationBase;
};
