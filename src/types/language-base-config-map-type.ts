import { Language } from '../enums';
import { LanguageConfigurationBase } from '../models';

export type LanguageBaseConfigMapType = {
	[key in Language]: LanguageConfigurationBase;
};
