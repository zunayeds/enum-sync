export abstract class StringHelper {
	private constructor() {}

	public static isNullOrWritespace(input: string): boolean {
		return !input || !input.trim().length;
	}

	public static convertToCamelCase(input: string): string {
		const words = this.splitIntoWords(input);
		return words
			.map((word, index) =>
				index === 0
					? word
					: word.charAt(0).toUpperCase() + word.slice(1)
			)
			.join('');
	}

	public static convertToPascalCase(input: string): string {
		const words = this.splitIntoWords(input);
		return words
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join('');
	}

	public static converToKebabCase(input: string): string {
		return this.splitIntoWords(input).join('-');
	}

	public static converToSnakeCase(input: string): string {
		return this.splitIntoWords(input).join('_');
	}

	public static addQuotation(
		value: string | number,
		doubleQuote: boolean = true
	): string {
		if (doubleQuote) return `"${value.toString()}"`;
		else return `'${value.toString()}'`;
	}

	private static splitIntoWords(input: string): string[] {
		return input
			.replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '') // Remove leading/trailing non-word characters
			.split(/(?=[A-Z])|[^A-Za-z0-9]+/) // Split at uppercase letters or non-word characters
			.filter(Boolean) // Remove any empty strings that might result from the split
			.map(word => word.toLowerCase()); // Convert all words to lowercase for consistent processing
	}
}
