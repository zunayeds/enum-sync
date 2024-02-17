import { Configuration } from '../configuration';
import { ObjectHelper } from '../utilities';

export abstract class ConfigCommand {
	public static async listAllConfig(json: boolean = false) {
		if (json) {
			console.log(JSON.stringify(Configuration, null, 2));
		} else {
			ObjectHelper.convertToList(Configuration);
		}
	}
}
