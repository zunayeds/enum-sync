#! /usr/bin/env node

import { Command, program } from 'commander';
import { ConfigCommand, GenerateCommand, LanguageCommand } from './commands';
import { ConfigService } from './services';
import {
	CONFIG_COMMAND,
	CONFIG_COMMAND_LIST_SUBCOMMAND,
	CONFIG_COMMAND_LIST_SUBCOMMAND_DESCRIPTION,
	CONFIG_COMMAND_LIST_SUBCOMMAND_JSON_OPTION,
	CONFIG_COMMAND_LIST_SUBCOMMAND_JSON_OPTION_DESCRIPTION,
	CONFIG_COMMAND_SET_SUBCOMMAND,
	CONFIG_COMMAND_SET_SUBCOMMAND_DESCRIPTION,
	GENERATE_COMMAND,
	GENERATE_COMMAND_DESCRIPTION,
	GENERATE_COMMAND_SOURCE_LANGUAGE_OPTION,
	GENERATE_COMMAND_SOURCE_LANGUAGE_OPTION_DESCRIPTION,
	GENERATE_COMMAND_SOURCE_OPTION,
	GENERATE_COMMAND_SOURCE_OPTION_DESCRIPTION,
	GENERATE_COMMAND_TARGET_LANGUAGE_OPTION,
	GENERATE_COMMAND_TARGET_LANGUAGE_OPTION_DESCRIPTION,
	GENERATE_COMMAND_TARGET_OPTION,
	GENERATE_COMMAND_TARGET_OPTION_DESCRIPTION,
	LANGUAGE_COMMAND,
	LANGUAGE_COMMAND_DESCRIPTION,
	LANGUAGE_COMMAND_TABLE_OPTION,
	LANGUAGE_COMMAND_TABLE_OPTION_DESCRIPTION
} from './constants/commands';
import { PROGRAM_DESCRIPTION, PROGRAM_VERSION } from './constants';

export abstract class Program {
	private constructor() {}

	public static async initialize() {
		await ConfigService.initialize();
		await this.setCommands();
	}

	private static async setCommands(): Promise<void> {
		program.version(PROGRAM_VERSION).description(PROGRAM_DESCRIPTION);

		program
			.command(LANGUAGE_COMMAND)
			.description(LANGUAGE_COMMAND_DESCRIPTION)
			.option(
				LANGUAGE_COMMAND_TABLE_OPTION,
				LANGUAGE_COMMAND_TABLE_OPTION_DESCRIPTION
			)
			.action(cmd =>
				LanguageCommand.listAllSupportedLanguages(cmd.table)
			);

		const configCommand = new Command(CONFIG_COMMAND);

		configCommand
			.command(CONFIG_COMMAND_LIST_SUBCOMMAND)
			.description(CONFIG_COMMAND_LIST_SUBCOMMAND_DESCRIPTION)
			.option(
				CONFIG_COMMAND_LIST_SUBCOMMAND_JSON_OPTION,
				CONFIG_COMMAND_LIST_SUBCOMMAND_JSON_OPTION_DESCRIPTION
			)
			.action(async cmd => {
				await ConfigCommand.listAllConfig(cmd.json);
			});

		configCommand
			.command(CONFIG_COMMAND_SET_SUBCOMMAND)
			.description(CONFIG_COMMAND_SET_SUBCOMMAND_DESCRIPTION)
			.action(async keyValues => {
				await ConfigCommand.setConfig(keyValues);
			});

		program.addCommand(configCommand);

		program
			.command(GENERATE_COMMAND)
			.description(GENERATE_COMMAND_DESCRIPTION)
			.requiredOption(
				GENERATE_COMMAND_SOURCE_OPTION,
				GENERATE_COMMAND_SOURCE_OPTION_DESCRIPTION
			)
			.option(
				GENERATE_COMMAND_SOURCE_LANGUAGE_OPTION,
				GENERATE_COMMAND_SOURCE_LANGUAGE_OPTION_DESCRIPTION
			)
			.requiredOption(
				GENERATE_COMMAND_TARGET_OPTION,
				GENERATE_COMMAND_TARGET_OPTION_DESCRIPTION
			)
			.option(
				GENERATE_COMMAND_TARGET_LANGUAGE_OPTION,
				GENERATE_COMMAND_TARGET_LANGUAGE_OPTION_DESCRIPTION
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
