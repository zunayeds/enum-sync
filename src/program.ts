#! /usr/bin/env node

import { Command, program } from 'commander';
import { ConfigCommand, GenerateCommand, LanguageCommand } from './commands';

export abstract class Program {
	public static async initialize() {
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
			.action(cmd => {
				ConfigCommand.listAllConfig(cmd.json);
			});

		program.addCommand(configCommand);

		program
			.command('gen')
			.description('Generate File(s)')
			.requiredOption('-src, --source <directory>', 'Source Directory')
			.requiredOption(
				'-src-lng --source-language <language>',
				'Source Language'
			)
			.requiredOption('-tgt --target <directory>', 'Target Directory')
			.requiredOption(
				'-tgt-lng --target-language <language>',
				'Target Language'
			)
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
