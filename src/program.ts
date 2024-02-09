#! /usr/bin/env node

import { program } from "commander";
import { error } from "console";
import { SUPPORTED_DESTINATION_LANGUAGES, SUPPORTED_SOURCE_LANGUAGES } from "./constants";
import { FileProcessor, FolderProcessor } from "./processors";
import { DART_CONFIGURATION, JAVASCRIPT_CONFIGURATION, LanguageConfigurationBase, TYPESCRIPT_CONFIGURATION } from "./language-configurations";
import { Language } from "./enums";
import { EnumParserBase, JavaScriptParser } from "./parsers";
import { DartConverter, EnumConverterBase } from "./converters";
import { Configuration } from "./configuration";
import { CodeFile } from "./models";

export abstract class Program {
    private static sourceDirectory: string;
    private static sourceLanguage: string;
    private static destinationDirectory: string;
    private static destinationLanguage: string;
    private static sourceLanguageConfiguration: LanguageConfigurationBase;
    private static destinationLanguageConfiguration: LanguageConfigurationBase;
    private static enumParser: EnumParserBase;
    private static enumConverter: EnumConverterBase;

    public static initialize() {
        program
            .version('1.0.0')
            .description('A cross-platform enum generator')
            .requiredOption('-src, --source <directory>', 'Source Directory', this.setSource)
            .requiredOption('-src-lng --source-language <language>', 'Source Language', this.setSourceLanguage)
            .requiredOption('-dst --destination <directory>', 'Destination Directory', this.setDestination)
            .requiredOption('-dst-lng --destination-language <language>', 'Destination Language', this.setDestinationLanguage)
            .requiredOption('-g', 'Generate File(s)', this.generate);

        program.parse(process.argv);
    }

    private static setSource(directory: string): void {
        this.sourceDirectory = directory;
    }

    private static setSourceLanguage(language: string): void {
        // if (StringHelper.isNullOrWritespace(language)) {
        //     throw error('Please provide valid');
        // }
        if (!SUPPORTED_SOURCE_LANGUAGES.includes(language)) {
            throw error('Please source language is not supported');
        }
        this.sourceLanguage = language;
    }

    private static setDestination(directory: string): void {
        this.destinationDirectory = directory;
    }

    private static setDestinationLanguage(language: string): void {
        if (!SUPPORTED_DESTINATION_LANGUAGES.includes(language)) {
            throw error('Please destination language is not supported');
        }
        this.destinationLanguage = language;
    }

    private static generate() {
        this.setGeneratorProperties();

        const filesToProcess = FolderProcessor.getFiles(this.sourceDirectory, this.sourceLanguageConfiguration.fileExtension);
        
        if (filesToProcess.length) {
            let files: CodeFile[] = [];

            if (Configuration.separateFileForEachType) {
                filesToProcess.forEach(file => {
                    const genericEnums = this.enumParser.parseFile(file);
                    files = files.concat(this.enumConverter.convertEnumsToFiles(genericEnums));
                });
            } else {
                filesToProcess.forEach(file => {
                    const genericEnums = this.enumParser.parseFile(file);
                    const fileName = FileProcessor.getFileNameFromPath(file, false);
                    files.push({
                        fileName: FileProcessor.generateFileName(fileName, this.destinationLanguageConfiguration),
                        fileContent: this.enumConverter.convertEnumsToString(genericEnums)
                    });
                });
            }

            files.forEach(file => {
                const folderSeprator = this.destinationDirectory.includes('/') ? '/' : '\\';
                const fullFilePath = `${this.destinationDirectory}${folderSeprator}${file.fileName}`;

                FileProcessor.writeIntoFile(fullFilePath, file.fileContent);
            });
        }
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