export abstract class TypeHelper {
	public static isNumber(enumValue: string | number): boolean {
		return Number.isInteger(enumValue);
	}
}
