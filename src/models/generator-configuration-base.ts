import { Language } from '../enums';

export interface GeneratorConfigurationBase {
	separateFileForEachType: boolean;
	defaultSourceLanguage?: Language;
	defaultTargetLanguage?: Language;
}
