import { error } from "console";
import { FileService, FolderService } from ".";
import { Configuration } from "../configuration";
import { SUPPORTED_DESTINATION_LANGUAGES, SUPPORTED_SOURCE_LANGUAGES } from "../constants";
import { DartConverter, EnumConverterBase } from "../converters";
import { Language } from "../enums";
import { DART_CONFIGURATION, JAVASCRIPT_CONFIGURATION, LanguageConfigurationBase, TYPESCRIPT_CONFIGURATION } from "../language-configurations";
import { CodeFile } from "../models";
import { EnumParserBase, JavaScriptParser } from "../parsers";

export abstract class GeneratorCommandService {
    private static sourceDirectory: string;
    private static sourceLanguage: string;
    private static destinationDirectory: string;
    private static destinationLanguage: string;
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
        if (!SUPPORTED_SOURCE_LANGUAGES.includes(sourceLanguage)) {
            throw error('Source language is not supported');
        }

        if (!SUPPORTED_DESTINATION_LANGUAGES.includes(destinationLanguage)) {
            throw error('Destination language is not supported');
        }

        this.sourceDirectory = source;
        this.sourceLanguage = sourceLanguage;
        this.destinationDirectory = destination;
        this.destinationLanguage = destinationLanguage;
    }

    private static setGeneratorProperties(): void {
        switch(this.sourceLanguage) {
            case Language.JavaScript:
                this.sourceLanguageConfiguration = JAVASCRIPT_CONFIGURATION;
                this.enumParser = new JavaScriptParser();
                break;
            case Language.TypeScript:
                this.sourceLanguageConfiguration = TYPESCRIPT_CONFIGURATION;
                this.enumParser = new JavaScriptParser();
                break;
        }

        switch(this.destinationLanguage) {
            case Language.Dart:
                this.destinationLanguageConfiguration = DART_CONFIGURATION;
                this.enumConverter = new DartConverter();
                break;
        }
    }
}