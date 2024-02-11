import { readFileSync, writeFileSync } from 'fs';
import { LanguageConfigurationBase } from '../language-configurations';
import { StringCasingType } from '../enums';
import { StringHelper } from '../helpers';

export abstract class FileService {
    public static readFile(filePath: string): string {
        return readFileSync(filePath).toString();
    }

    public static writeIntoFile(filePath: string, fileContent: string): void {
        writeFileSync(filePath, fileContent, {
            encoding: 'utf-8',
            flag: 'w+'
        });
    }

    public static generateFileName(name: string, configuration: LanguageConfigurationBase): string {
        let fileName: string;

        switch(configuration.fileNameCasing) {
            case StringCasingType.CamelCase:
                fileName = StringHelper.convertToCamelCase(name);
                break;
            case StringCasingType.KebabCase:
                fileName = StringHelper.converToKebabCase(name);
                break;
            case StringCasingType.PascalCase:
                fileName = StringHelper.convertToPascalCase(name);
                break;
            case StringCasingType.SnakeCase:
                fileName = StringHelper.converToSnakeCase(name);
                break;
        }

        return `${fileName}.${configuration.fileExtension}`;
    }

    public static getFileNameFromPath(filePath: string, withExtension: boolean = true): string {
        // Handle both UNIX-like ("/") and Windows ("\") path separators
        const separators = ['/', '\\'];
        
        // Split the path by each separator and get the last part
        let fileName = filePath;
        separators.forEach(separator => {
            fileName = fileName.split(separator).pop() || fileName;
        });

        // Check and remove extension
        if (!withExtension) {
            const lastDotIndex = fileName.lastIndexOf('.');
            if (lastDotIndex > 0) {
                fileName = fileName.substring(0, lastDotIndex);
            }
        }

        return fileName;
    }
}