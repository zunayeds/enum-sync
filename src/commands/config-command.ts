import { ConfigService } from '../services';
import { LogService } from '../services/log-service';
import { ObjectHelper } from '../utilities';

export abstract class ConfigCommand {
	private constructor() {}

	public static async listAllConfig(json: boolean = false) {
		const config = await ConfigService.getConfigurations();

		if (json) {
			LogService.showInfoMessage(JSON.stringify(config, null, 2));
		} else {
			ObjectHelper.convertToTable(config);
		}
	}
}
