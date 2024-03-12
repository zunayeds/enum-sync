export abstract class TypeHelper {
	private constructor() {}

	public static isNumber(enumValue: string | number): boolean {
		return Number.isInteger(enumValue);
	}
}
