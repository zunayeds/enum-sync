import {
	DEFAULT_GENERATOR_CONFIGURATION,
	GENERATOR_CONFIGURATION_SCHEMA,
	GENERATOR_PROJECT_NAME,
	GENERATOR_STORED_OBJECT_NAME
} from '../constants';
import { GeneratorConfigurationBase } from '../models';

export abstract class ConfigService {
	private constructor() {}

	public static async getConfigurations(): Promise<GeneratorConfigurationBase> {
		const config = await this.getProjectConfig();
		const variable = config.get(GENERATOR_STORED_OBJECT_NAME);
		return variable
			? (variable as GeneratorConfigurationBase)
			: DEFAULT_GENERATOR_CONFIGURATION;
	}

	public static async getSpecificConfiguration<
		K extends keyof GeneratorConfigurationBase
	>(configurationKey: K): Promise<GeneratorConfigurationBase[K]> {
		const config = await this.getProjectConfig();
		return config.get(
			`${GENERATOR_STORED_OBJECT_NAME}.${configurationKey}`
		);
	}

	public static async initialize() {
		const config = await this.getProjectConfig();

		if (config.get(GENERATOR_STORED_OBJECT_NAME)) {
			return;
		}

		config.set(
			GENERATOR_STORED_OBJECT_NAME,
			DEFAULT_GENERATOR_CONFIGURATION
		);
	}

	private static async getProjectConfig(): Promise<any> {
		const conf = await import('conf');
		return new conf.default({
			projectName: GENERATOR_PROJECT_NAME,
			schema: GENERATOR_CONFIGURATION_SCHEMA
		});
	}
}
