import { Language } from '../enums';
import { LanguageEngineConfigurationBase } from '../models';

export type LanguageEngineMapType = {
	[key in Language]: LanguageEngineConfigurationBase;
};
