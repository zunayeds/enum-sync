import { GeneratorConfigurationBase } from '../models';

export type GenratorConfigSchemaType = {
	[key in keyof GeneratorConfigurationBase]: any;
};
