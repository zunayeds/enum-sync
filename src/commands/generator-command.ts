import { FileService, FolderService } from "../services";
import { Configuration } from "../configuration";
import { LANGUAGE_CONFIG_MAPPINGS, SUPPORTED_DESTINATION_LANGUAGES, SUPPORTED_SOURCE_LANGUAGES } from "../constants";
import { EnumConverterBase } from "../converters";
import { Language } from "../enums";
import { CodeFile, LanguageConfigurationBase } from "../models";
import { EnumParserBase } from "../parsers";
import { ErrorHelper } from "../helpers";

export abstract class GeneratorCommand {
    private static sourceDirectory: string;
    private static sourceLanguage: Language;
    private static destinationDirectory: string;
    private static destinationLanguage: Language;
    private static sourceLanguageConfiguration: LanguageConfigurationBase;
    private static destinationLanguageConfiguration: LanguageConfigurationBase;
    private static enumParser: EnumParserBase;
    private static enumConverter: EnumConverterBase;

    public static generate(source: string, sourceLanguage: string, destination: string, destinationLanguage: string) {
        this.validateCommandParamters(source, sourceLanguage, destination, destinationLanguage);
        
        this.setGeneratorProperties();

        const filesToProcess = FolderService.getFiles(this.sourceDirectory, this.sourceLanguageConfiguration.fileExtension);
        
        if (filesToProcess.length) {
            let files: CodeFile[] = [];

            if (Configuration.separateFileForEachType) {
                filesToProcess.forEach(file => {
                    const fileContent = FileService.readFile(file);
                    const genericEnums = this.enumParser.parseFileContent(fileContent);
                    files = files.concat(this.enumConverter.convertEnumsToFiles(genericEnums));
                });
            } else {
                filesToProcess.forEach(file => {
                    const fileContent = FileService.readFile(file);
                    const genericEnums = this.enumParser.parseFileContent(fileContent);
                    const fileName = FileService.getFileNameFromPath(file, false);
                    files.push({
                        fileName: FileService.generateFileName(fileName, this.destinationLanguageConfiguration),
                        fileContent: this.enumConverter.convertEnumsToString(genericEnums)
                    });
                });
            }

            files.forEach(file => {
                const fullPath = `${this.destinationDirectory}${FolderService.getSeparator(this.destinationDirectory)}${file.fileName}`;
                FileService.writeIntoFile(fullPath, file.fileContent);
            });

            console.log('File(s) generated');
        }
    }

    private static validateCommandParamters(source: string, sourceLanguage: string, destination: string, destinationLanguage: string): void {
        try {
            if (!SUPPORTED_SOURCE_LANGUAGES.includes(sourceLanguage)) {
                throw new Error('Source language is not supported');
            }

            if (!SUPPORTED_DESTINATION_LANGUAGES.includes(destinationLanguage)) {
                throw new Error('Destination language is not supported');
            }

            this.sourceDirectory = source;
            this.sourceLanguage = sourceLanguage as Language;
            this.destinationDirectory = destination;
            this.destinationLanguage = destinationLanguage as Language;
        } catch (error: unknown) {
            ErrorHelper.handleException(error);
        }
    }

    private static setGeneratorProperties(): void {
        this.sourceLanguageConfiguration = LANGUAGE_CONFIG_MAPPINGS[this.sourceLanguage];
        this.destinationLanguageConfiguration = LANGUAGE_CONFIG_MAPPINGS[this.destinationLanguage];

        if (this.sourceLanguageConfiguration.enumParser) {
            this.enumParser = this.sourceLanguageConfiguration.enumParser;
        }
        
        if (this.destinationLanguageConfiguration.enumConverter) {
            this.enumConverter = this.destinationLanguageConfiguration.enumConverter;
        }
    }
}