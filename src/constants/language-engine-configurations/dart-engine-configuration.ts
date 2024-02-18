import { DartConverter } from '../../converters';
import { Language } from '../../enums';
import { LanguageEngineConfigurationBase } from '../../models';

export const DART_ENGINE_CONFIGURATION: LanguageEngineConfigurationBase = {
	enumConverter: new DartConverter(Language.Dart)
};
