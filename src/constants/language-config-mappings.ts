import { Language } from '../enums';
import { LanguageBaseConfigMapType } from '../types';
import {
	CSHARP_CONFIGURATION,
	DART_CONFIGURATION,
	JAVASCRIPT_CONFIGURATION,
	TYPESCRIPT_CONFIGURATION
} from './language-configurations';

export const LANGUAGE_CONFIG_MAPPINGS: LanguageBaseConfigMapType = {
	[Language.CSharp]: CSHARP_CONFIGURATION,
	[Language.JavaScript]: JAVASCRIPT_CONFIGURATION,
	[Language.TypeScript]: TYPESCRIPT_CONFIGURATION,
	[Language.Dart]: DART_CONFIGURATION
};
