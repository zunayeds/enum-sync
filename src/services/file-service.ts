import { readFileSync, writeFileSync } from 'fs';
import { StringCasingType } from '../enums';
import { StringHelper } from '../utilities';
import { LanguageConfigurationBase } from '../models';

export abstract class FileService {
	/* istanbul ignore next */
	private constructor() {}

	public static readFile(filePath: string): string {
		return readFileSync(filePath).toString();
	}

	public static writeIntoFile(filePath: string, fileContent: string): void {
		writeFileSync(filePath, fileContent, {
			encoding: 'utf-8',
			flag: 'w+'
		});
	}

	public static generateFileName(
		name: string,
		configuration: LanguageConfigurationBase
	): string {
		let fileName: string = name;

		switch (configuration.fileNameCasing) {
			case StringCasingType.CamelCase:
				fileName = StringHelper.convertToCamelCase(name);
				break;
			case StringCasingType.KebabCase:
				fileName = StringHelper.convertToKebabCase(name);
				break;
			case StringCasingType.PascalCase:
				fileName = StringHelper.convertToPascalCase(name);
				break;
			case StringCasingType.SnakeCase:
				fileName = StringHelper.convertToSnakeCase(name);
				break;
		}

		return `${fileName}.${configuration.fileExtension}`;
	}

	public static getFileNameFromPath(
		filePath: string,
		withExtension: boolean = true
	): string {
		// Handle both UNIX-like ("/") and Windows ("\") path separators
		const separators = ['/', '\\'];

		let fileName = filePath;
		separators.forEach(separator => {
			fileName = fileName.split(separator).pop() || fileName;
		});

		if (!withExtension) {
			const lastDotIndex = fileName.lastIndexOf('.');
			if (lastDotIndex > 0) {
				fileName = fileName.substring(0, lastDotIndex);
			}
		}

		return fileName;
	}
}
