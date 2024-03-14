import { LogService } from '../services/log-service';

export abstract class ObjectHelper {
	/* istanbul ignore next */
	private constructor() {}

	public static convertToTable(obj: Record<string, any>): void {
		const keyValueGap = 5;
		const maxLength = Math.max(...Object.keys(obj).map(key => key.length));

		LogService.showInfoMessage(
			'Key'.padEnd(maxLength + keyValueGap) + 'Value'
		);
		LogService.showInfoMessage('-'.repeat(maxLength + keyValueGap * 3));

		for (const key in obj) {
			const value = obj[key];
			LogService.showInfoMessage(
				key.padEnd(maxLength + keyValueGap) + value
			);
		}
	}
}
