import { LANGUAGE_CONFIG_MAPPINGS } from '../constants';
import { Language } from '../enums';
import { CodeFile, GenericEnum, LanguageConfigurationBase } from '../models';
import { FileService } from '../services';

export abstract class EnumConverterBase {
	protected readonly languageConfiguration: LanguageConfigurationBase;

	constructor(protected readonly language: Language) {
		this.languageConfiguration = LANGUAGE_CONFIG_MAPPINGS[this.language];
	}

	abstract convertEnum(genericEnum: GenericEnum): Promise<string>;

	public convertEnumsToString(genericEnums: GenericEnum[]): string {
		return this.convertEnumsToStringInternal(genericEnums);
	}

	public async convertEnumsToFiles(genericEnums: GenericEnum[]): Promise<CodeFile[]> {
		return  await this.convertEnumsToFilesInternal(genericEnums);
	}

	protected convertEnumsToStringInternal(
		genericEnums: GenericEnum[]
	): string {
		let fileContent: string = '';

		genericEnums.forEach(async genericEnum => {
			fileContent += '\n\n';
			fileContent += await this.convertEnum(genericEnum);
		});

		fileContent = fileContent.replace(/^\n\n/, '');

		return fileContent;
	}

	protected async convertEnumsToFilesInternal(
		genericEnums: GenericEnum[]
	): Promise<CodeFile[]> {
		let fileContents: CodeFile[] = [];

		const promises = genericEnums.map(async genericEnum => {
			const content = await this.convertEnum(genericEnum);

			fileContents.push({
				fileName: FileService.generateFileName(
					genericEnum.name,
					this.languageConfiguration
				),
				fileContent: content
			});
		});

		await Promise.all(promises);

		return fileContents;
	}
}
