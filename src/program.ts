#! /usr/bin/env node

import { Command, program } from 'commander';
import { ConfigCommand, GenerateCommand, LanguageCommand } from './commands';
import { ConfigService } from './services';

export abstract class Program {
	private constructor() {}

	public static async initialize() {
		await ConfigService.initialize();
		await this.setCommands();
	}

	private static async setCommands(): Promise<void> {
		program.version('1.0.0').description('A cross-platform enum generator');

		program
			.command('lang')
			.description('List all supported languages')
			.option('-t --table', 'Output in Table format')
			.action(cmd =>
				LanguageCommand.listAllSupportedLanguages(cmd.table)
			);

		const configCommand = new Command('config');

		configCommand
			.command('list')
			.description('List all configuration values')
			.option('--json', 'Output in JSON format')
			.action(async cmd => {
				await ConfigCommand.listAllConfig(cmd.json);
			});

		program.addCommand(configCommand);

		program
			.command('gen')
			.description('Generate File(s)')
			.requiredOption('-src, --source <directory>', 'Source Directory')
			.option('-src-lng --source-language <language>', 'Source Language')
			.requiredOption('-tgt --target <directory>', 'Target Directory')
			.option('-tgt-lng --target-language <language>', 'Target Language')
			.action(
				async cmd =>
					await GenerateCommand.generateFiles(
						cmd.source,
						cmd.sourceLanguage,
						cmd.target,
						cmd.targetLanguage
					)
			);

		program.parse(process.argv);
	}
}
