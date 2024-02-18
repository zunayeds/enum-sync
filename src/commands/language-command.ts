import {
	SUPPORTED_SOURCE_LANGUAGES,
	SUPPORTED_TARGET_LANGUAGES
} from '../constants';
import { Language } from '../enums';
import { EnumObject } from '../models';
import { EnumHelper } from '../utilities';

export abstract class LanguageCommand {
	private static readonly sourceLanguageHeader: string = 'Source Language';
	private static readonly targetLanguageHeader: string = 'Target Language';

	public static listAllSupportedLanguages(table: boolean = false): void {
		// Convert the enum to a list of objects
		const langauges = EnumHelper.convertToEnumObjectList(Language);

		const sourceLanguages = langauges
			.filter(lang =>
				SUPPORTED_SOURCE_LANGUAGES.includes(lang.value as string)
			)
			.sort((a, b) => a.key.localeCompare(b.key));
		const targetLanguages = langauges
			.filter(lang =>
				SUPPORTED_TARGET_LANGUAGES.includes(lang.value as string)
			)
			.sort((a, b) => a.key.localeCompare(b.key));

		if (table) {
			this.listInTableFormat(sourceLanguages, targetLanguages);
		} else {
			this.listInCommaSeparatedFormat(sourceLanguages, targetLanguages);
		}
	}

	private static listInCommaSeparatedFormat(
		sourceLanguages: EnumObject[],
		targetLanguages: EnumObject[]
	): void {
		const sourceLangs = sourceLanguages
			.map(lang => `${lang.key}(${lang.value})`)
			.join(', ');
		const targetLangs = targetLanguages
			.map(lang => `${lang.key}(${lang.value})`)
			.join(', ');

		console.log(
			`Supported ${this.sourceLanguageHeader}s: ${sourceLangs}\nSupported${this.targetLanguageHeader}s: ${targetLangs}`
		);
	}

	private static listInTableFormat(
		sourceLanguages: EnumObject[],
		targetLanguages: EnumObject[]
	): void {
		const nameAndCodeGap: number = 2;
		const dividerGap: number = 4;
		const endPadding: number = 5;

		// Calculate maximum lengths for name and code in both lists
		const sourceMaxNameLength = Math.max(
			this.sourceLanguageHeader.length,
			...sourceLanguages.map(lang => lang.key.length)
		);
		const sourceMaxCodeLength = Math.max(
			...sourceLanguages.map(lang => lang.value.toString().length)
		);
		const targetMaxNameLength = Math.max(
			this.targetLanguageHeader.length,
			...targetLanguages.map(lang => lang.key.length)
		);
		const targetMaxCodeLength = Math.max(
			...targetLanguages.map(lang => lang.value.toString().length)
		);

		// Calculate total width for formatting
		const totalWidth =
			sourceMaxNameLength +
			sourceMaxCodeLength +
			targetMaxNameLength +
			targetMaxCodeLength;

		// Print header
		console.log(
			'Source Language'.padEnd(sourceMaxNameLength + nameAndCodeGap) +
				'Code'.padEnd(sourceMaxCodeLength + dividerGap) +
				'|'.padEnd(dividerGap) +
				'Target Language'.padEnd(targetMaxNameLength + nameAndCodeGap) +
				'Code'
		);
		console.log(
			'-'.repeat(
				totalWidth + endPadding + (nameAndCodeGap + dividerGap) * 2
			)
		);

		// Print language pairs
		for (
			let i = 0;
			i < Math.max(sourceLanguages.length, targetLanguages.length);
			i++
		) {
			const sourceLang =
				sourceLanguages[i] || ({ key: '', value: '' } as EnumObject);
			const targetLang =
				targetLanguages[i] ||
				({
					key: '',
					value: ''
				} as EnumObject);

			console.log(
				sourceLang.key.padEnd(sourceMaxNameLength + nameAndCodeGap) +
					sourceLang.value
						.toString()
						.padEnd(sourceMaxCodeLength + dividerGap) +
					'|'.padEnd(dividerGap) +
					targetLang.key.padEnd(
						targetMaxNameLength + nameAndCodeGap
					) +
					targetLang.value.toString()
			);
		}
	}
}
