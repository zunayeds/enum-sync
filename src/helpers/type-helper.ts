export abstract class TypeHelper {
    public static isNumber(enumValue: string | number) {
        return Number.isInteger(enumValue);
    }
}