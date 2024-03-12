import { JAVASCRIPT_CONFIGURATION } from '.';
import { LanguageConfigurationBase } from '../../models';

export const TYPESCRIPT_CONFIGURATION: LanguageConfigurationBase = {
	...JAVASCRIPT_CONFIGURATION,
	fileExtension: 'ts'
};
