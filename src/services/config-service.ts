import {
	DEFAULT_GENERATOR_CONFIGURATION,
	GENERATOR_CONFIGURATION_SCHEMA,
	GENERATOR_PROJECT_NAME,
	GENERATOR_STORED_OBJECT_NAME
} from '../constants';
import {
	INVALID_CONFIG_KEY_MESSAGE,
	INVALID_CONFIG_VALUE_TYPE_MESSAGE,
	INVALID_ENUM_CONFIG_VALUE_MESSAGE
} from '../constants/messages/error-messages';
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

	public static async setConfigurations(keyValues: {
		[K in keyof GeneratorConfigurationBase]?: GeneratorConfigurationBase[K];
	}): Promise<void> {
		const config = await this.getProjectConfig();

		Object.keys(keyValues).forEach(key => {
			const schema = this.getSchema(key);
			if (!schema) {
				throw new Error(INVALID_CONFIG_KEY_MESSAGE(key));
			}

			let value;

			try {
				value = this.convertValue(
					key,
					schema,
					keyValues[key as keyof GeneratorConfigurationBase] as string
				);
			} catch (error: unknown) {
				throw error;
			}

			try {
				config.set(key, value);
			} catch (error: unknown) {
				throw new Error(
					INVALID_CONFIG_VALUE_TYPE_MESSAGE(key, schema.type)
				);
			}
		});
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
		return new conf.default<GeneratorConfigurationBase>({
			projectName: GENERATOR_PROJECT_NAME,
			schema: GENERATOR_CONFIGURATION_SCHEMA
		});
	}

	private static convertValue(
		key: string,
		schema: any,
		value: string
	): GeneratorConfigurationBase[keyof GeneratorConfigurationBase] {
		const trimmedLowerValue = value.toLowerCase().trim();

		switch (schema.type) {
			case 'boolean':
				if (
					trimmedLowerValue !== 'true' &&
					trimmedLowerValue !== 'false'
				) {
					throw new Error(
						INVALID_CONFIG_VALUE_TYPE_MESSAGE(key, schema.type)
					);
				}
				return (trimmedLowerValue === 'true') as any;
			case 'string':
				if (schema.enum && !schema.enum.includes(trimmedLowerValue)) {
					throw new Error(
						INVALID_ENUM_CONFIG_VALUE_MESSAGE(key, schema.enum)
					);
				}
				return value as any;
			default:
				return value as any;
		}
	}

	private static getSchema(key: string) {
		return GENERATOR_CONFIGURATION_SCHEMA[
			key as keyof GeneratorConfigurationBase
		];
	}
}
