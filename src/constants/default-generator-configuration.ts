import { Language } from '../enums';
import { GeneratorConfigurationBase } from '../models';
import { GenratorConfigSchemaType } from '../types';

export const GENERATOR_PROJECT_NAME = 'enum-generator';
export const GENERATOR_STORED_OBJECT_NAME = 'generator-configurations';

export const DEFAULT_GENERATOR_CONFIGURATION: GeneratorConfigurationBase = {
	separateFileForEachType: true
};

export const GENERATOR_CONFIGURATION_SCHEMA: GenratorConfigSchemaType = {
	separateFileForEachType: {
		type: 'boolean'
	},
	defaultSourceLanguage: {
		type: 'string',
		enum: Object.values(Language)
	},
	defaultTargetLanguage: {
		type: 'string',
		enum: Object.values(Language)
	}
};
