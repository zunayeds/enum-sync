import { Language } from '../enums';

export interface GeneratorConfigurationBase {
	separateFileForEachType: boolean;
	favouriteSourceLanguage?: Language;
	favouriteTargetLanguage?: Language;
}
