import { EnumParserBase } from '.';
import { GenericEnumItem } from '../models';

export class CSharpParser extends EnumParserBase {
	public parseEnumBody(enumBody: string): GenericEnumItem[] {
		const itemRegex = this.languageConfiguration
			.enumBodyParserRegex as RegExp;
		let match;
		const items: GenericEnumItem[] = [];
		let lastNumericValue = -1; // Start before 0, as the first value (if not set) should be 0.

		while ((match = itemRegex.exec(enumBody)) !== null) {
			const itemName = match[1];
			const itemValueStr = match[2];
			let itemValue: string | number;

			if (itemValueStr !== undefined) {
				// Check if the value is numeric or a string and remove quotes if necessary
				const parsedValue =
					itemValueStr.trim().startsWith("'") ||
					itemValueStr.trim().startsWith('"')
						? itemValueStr.trim().slice(1, -1)
						: isNaN(Number(itemValueStr))
							? itemValueStr.trim()
							: Number(itemValueStr);

				itemValue = parsedValue;
				if (typeof parsedValue === 'number') {
					lastNumericValue = parsedValue;
				}
			} else {
				// If no value is explicitly set, increment from the last numeric value
				itemValue = ++lastNumericValue;
			}

			items.push({ name: itemName, value: itemValue });
		}

		return items;
	}
}
