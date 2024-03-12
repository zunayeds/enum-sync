import { EnumConverterBase } from '../converters';
import { EnumParserBase } from '../parsers';

export interface LanguageEngineConfigurationBase {
	enumParser?: EnumParserBase;
	enumConverter?: EnumConverterBase;
}
