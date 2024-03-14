export abstract class LogService {
	/* istanbul ignore next */
	private constructor() {}

	public static showInfoMessage(message: string): void {
		console.log(message);
	}

	public static async showSuccessMessage(message: string): Promise<void> {
		const chalk = await this.getChalkInstance();
		console.log(chalk.green(message));
	}

	public static async showWarningMessage(message: string): Promise<void> {
		const chalk = await this.getChalkInstance();
		console.log(chalk.yellow(message));
	}

	public static async showErrorMessage(message: string): Promise<void> {
		const chalk = await this.getChalkInstance();
		console.error(chalk.red(message));
	}

	/* istanbul ignore next */
	private static async getChalkInstance(): Promise<any> {
		const chalk = await import('chalk');
		return chalk.default;
	}
}
