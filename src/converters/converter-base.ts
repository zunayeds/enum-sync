import { LANGUAGE_CONFIG_MAPPINGS } from '../constants';
import { Language } from '../enums';
import { CodeFile, GenericEnum, LanguageConfigurationBase } from '../models';
import { FileService } from '../services';

export abstract class EnumConverterBase {
	protected readonly languageConfiguration: LanguageConfigurationBase;

	constructor(protected readonly language: Language) {
		this.languageConfiguration = LANGUAGE_CONFIG_MAPPINGS[this.language];
	}

	abstract convertEnum(genericEnum: GenericEnum): string;

	public convertEnumsToString(genericEnums: GenericEnum[]): string {
		return this.convertEnumsToStringInternal(genericEnums);
	}

	public convertEnumsToFiles(genericEnums: GenericEnum[]): CodeFile[] {
		return this.convertEnumsToFilesInternal(genericEnums);
	}

	protected convertEnumsToStringInternal(
		genericEnums: GenericEnum[]
	): string {
		let fileContent: string = '';

		genericEnums.forEach(genericEnum => {
			fileContent += '\n\n';
			fileContent += this.convertEnum(genericEnum);
		});

		fileContent = fileContent.replace(/^\n\n/, '');

		return fileContent;
	}

	protected convertEnumsToFilesInternal(
		genericEnums: GenericEnum[]
	): CodeFile[] {
		let fileContents: CodeFile[] = [];

		genericEnums.forEach(genericEnum => {
			const content = this.convertEnum(genericEnum);

			fileContents.push({
				fileName: FileService.generateFileName(
					genericEnum.name,
					this.languageConfiguration
				),
				fileContent: content
			});
		});

		return fileContents;
	}
}
