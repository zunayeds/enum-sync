import { FileService, FolderService } from '../services';
import { Configuration } from '../configuration';
import {
	LANGUAGE_CONFIG_MAPPINGS,
	LANGUAGE_ENGINE_MAPPINGS,
	SUPPORTED_SOURCE_LANGUAGES,
	SUPPORTED_TARGET_LANGUAGES
} from '../constants';
import { EnumConverterBase } from '../converters';
import { Language } from '../enums';
import {
	CodeFile,
	LanguageConfigurationBase,
	LanguageEngineConfigurationBase
} from '../models';
import { EnumParserBase } from '../parsers';
import { ErrorHelper } from '../utilities';
import { LogService } from '../services/log-service';

export abstract class GenerateCommand {
	private static sourceDirectory: string;
	private static sourceLanguage: Language;
	private static targetDirectory: string;
	private static targetLanguage: Language;
	private static sourceLanguageConfiguration: LanguageConfigurationBase;
	private static targetLanguageConfiguration: LanguageConfigurationBase;
	private static sourceLanguageEngine: LanguageEngineConfigurationBase;
	private static targetLanguageEngine: LanguageEngineConfigurationBase;
	private static enumParser: EnumParserBase;
	private static enumConverter: EnumConverterBase;

	public static async generateFiles(
		source: string,
		sourceLanguage: string,
		target: string,
		targetLanguage: string
	) {
		await this.validateCommandParamters(
			source,
			sourceLanguage,
			target,
			targetLanguage
		);

		await this.setGeneratorProperties();

		const filesToProcess = FolderService.getFiles(
			this.sourceDirectory,
			this.sourceLanguageConfiguration.fileExtension
		);

		if (filesToProcess.length) {
			let files: CodeFile[] = [];

			if (Configuration.separateFileForEachType) {
				filesToProcess.forEach(file => {
					const fileContent = FileService.readFile(file);
					const genericEnums =
						this.enumParser.parseFileContent(fileContent);
					files = files.concat(
						this.enumConverter.convertEnumsToFiles(genericEnums)
					);
				});
			} else {
				filesToProcess.forEach(file => {
					const fileContent = FileService.readFile(file);
					const genericEnums =
						this.enumParser.parseFileContent(fileContent);
					const fileName = FileService.getFileNameFromPath(
						file,
						false
					);
					files.push({
						fileName: FileService.generateFileName(
							fileName,
							this.targetLanguageConfiguration
						),
						fileContent:
							this.enumConverter.convertEnumsToString(
								genericEnums
							)
					});
				});
			}

			files.forEach(file => {
				const fullPath = `${this.targetDirectory}${FolderService.getSeparator(this.targetDirectory)}${file.fileName}`;
				FileService.writeIntoFile(fullPath, file.fileContent);
			});

			await LogService.showSuccessMessage('File(s) generated');
		}
	}

	private static async validateCommandParamters(
		source: string,
		sourceLanguage: string,
		target: string,
		targetLanguage: string
	): Promise<any> {
		try {
			if (!FolderService.isValidDirectory(source)) {
				throw new Error('Source directory is not valid.');
			}

			if (source === target) {
				throw new Error(
					'Source and Target directories cannot be the same.'
				);
			}

			if (!SUPPORTED_SOURCE_LANGUAGES.includes(sourceLanguage)) {
				throw new Error('Source language is not supported.');
			}

			if (!SUPPORTED_TARGET_LANGUAGES.includes(targetLanguage)) {
				throw new Error('Target language is not supported.');
			}

			if (sourceLanguage === targetLanguage) {
				throw new Error(
					'Source and Target languages cannot be the same.'
				);
			}

			this.sourceDirectory = source;
			this.sourceLanguage = sourceLanguage as Language;
			this.targetDirectory = target;
			this.targetLanguage = targetLanguage as Language;
		} catch (error: unknown) {
			await ErrorHelper.handle(error);
		}
	}

	private static async setGeneratorProperties(): Promise<any> {
		try {
			this.sourceLanguageConfiguration =
				LANGUAGE_CONFIG_MAPPINGS[this.sourceLanguage];
			this.targetLanguageConfiguration =
				LANGUAGE_CONFIG_MAPPINGS[this.targetLanguage];
			this.sourceLanguageEngine =
				LANGUAGE_ENGINE_MAPPINGS[this.sourceLanguage];
			this.targetLanguageEngine =
				LANGUAGE_ENGINE_MAPPINGS[this.targetLanguage];

			if (this.sourceLanguageEngine.enumParser) {
				this.enumParser = this.sourceLanguageEngine.enumParser;
			} else {
				throw new Error(
					'Enum Parser not implemented for the source language.'
				);
			}

			if (this.targetLanguageEngine.enumConverter) {
				this.enumConverter = this.targetLanguageEngine.enumConverter;
			} else {
				throw new Error(
					'Enum Converter not implemented for the target language.'
				);
			}
		} catch (error: unknown) {
			await ErrorHelper.handle(error);
		}
	}
}
