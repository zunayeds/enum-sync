import { Language } from '../../enums';
import { LanguageEngineConfigurationBase } from '../../models';
import { JavaScriptParser } from '../../parsers';

export const JAVASCRIPT_ENGINE_CONFIGURATION: LanguageEngineConfigurationBase =
	{
		enumParser: new JavaScriptParser(Language.JavaScript)
	};
