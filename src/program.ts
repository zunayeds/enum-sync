#! /usr/bin/env node

import { Command, program } from 'commander';
import { ConfigCommand, GenerateCommand } from './commands';

export abstract class Program {
	public static async initialize() {
		program.version('1.0.0').description('A cross-platform enum generator');

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
			.requiredOption(
				'-dst --destination <directory>',
				'Destination Directory'
			)
			.requiredOption(
				'-dst-lng --destination-language <language>',
				'Destination Language'
			)
			.action(
				async cmd =>
					await GenerateCommand.generateFiles(
						cmd.source,
						cmd.sourceLanguage,
						cmd.destination,
						cmd.destinationLanguage
					)
			);

		program.parse(process.argv);
	}
}
