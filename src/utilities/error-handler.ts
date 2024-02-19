import { exit } from 'process';
import { LogService } from '../services/log-service';

export abstract class ErrorHandler {
	private constructor() {}

	public static async handle(
		error: unknown,
		stopProcess: boolean = true
	): Promise<void> {
		await LogService.showErrorMessage((error as Error).message);

		if (stopProcess) {
			exit();
		}
	}
}
