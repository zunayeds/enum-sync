export abstract class TypeHelper {
	/* istanbul ignore next */
	private constructor() {}

	public static isNumber(enumValue: string | number): boolean {
		return Number.isInteger(enumValue);
	}
}
