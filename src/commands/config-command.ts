import {
	DUPLICATE_KEY_MESSAGE,
	INVALID_KEY_VALUE_PAIR_FORMAT_MESSAGE
} from '../constants/messages';
import { GeneratorConfigurationBase } from '../models';
import { ConfigService } from '../services';
import { LogService } from '../services/log-service';
import { ErrorHelper, ObjectHelper } from '../utilities';

export abstract class ConfigCommand {
	private constructor() {}

	public static async listAllConfig(json: boolean = false): Promise<void> {
		const config = await ConfigService.getConfigurations();

		if (json) {
			LogService.showInfoMessage(JSON.stringify(config, null, 2));
		} else {
			ObjectHelper.convertToTable(config);
		}
	}

	public static async setConfig(keysValues: string[]): Promise<void> {
		const processedKeys: Set<string> = new Set();
		const newConfig = await ConfigService.getConfigurations();

		try {
			keysValues.forEach(async keyValue => {
				const [key, value] = keyValue.split('=');

				if (!key || !value) {
					throw new Error(
						INVALID_KEY_VALUE_PAIR_FORMAT_MESSAGE(keyValue)
					);
				}

				if (processedKeys.has(key)) {
					throw new Error(DUPLICATE_KEY_MESSAGE(key));
				}

				processedKeys.add(key);

				const parsedValue =
					value as unknown as GeneratorConfigurationBase[keyof GeneratorConfigurationBase];

				(newConfig as any)[key] = parsedValue;
			});

			await ConfigService.setConfigurations(
				newConfig as GeneratorConfigurationBase
			);
		} catch (error: unknown) {
			await ErrorHelper.handle(error);
			return;
		}
	}
}
