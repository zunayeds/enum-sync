import { EnumConverterBase } from '../converters';
import { EnumParserBase } from '../parsers';

export interface LanguageEngineConfigurationBase {
	enumParser?: new (...args: any[]) => EnumParserBase;
	enumConverter?: new (...args: any[]) => EnumConverterBase;
}
