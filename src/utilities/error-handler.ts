import { exit } from 'process';
import { LogService } from '../services/log-service';

export abstract class ErrorHandler {
	public static async handle(error: unknown, stopProcess: boolean = true) {
		await LogService.showErrorMessage((error as Error).message);

		if (stopProcess) {
			exit();
		}
	}
}
