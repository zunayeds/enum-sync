import { Language } from '../enums';
import { LanguageEngineMapType } from '../types';
import {
	CSHARP_ENGINE_CONFIGURATION,
	DART_ENGINE_CONFIGURATION,
	JAVASCRIPT_ENGINE_CONFIGURATION,
	TYPESCRIPT_ENGINE_CONFIGURATION
} from './language-engine-configurations';

export const LANGUAGE_ENGINE_MAPPINGS: LanguageEngineMapType = {
	[Language.CSharp]: CSHARP_ENGINE_CONFIGURATION,
	[Language.JavaScript]: JAVASCRIPT_ENGINE_CONFIGURATION,
	[Language.TypeScript]: TYPESCRIPT_ENGINE_CONFIGURATION,
	[Language.Dart]: DART_ENGINE_CONFIGURATION
};
