import { LanguageEngineConfigurationBase } from '../../models';
import { CSharpParser } from '../../parsers';

export const CSHARP_ENGINE_CONFIGURATION: LanguageEngineConfigurationBase = {
	enumParser: CSharpParser
};
