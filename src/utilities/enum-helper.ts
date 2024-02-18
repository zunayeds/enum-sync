import { EnumObject } from '../models';

export abstract class EnumHelper {
	public static convertToEnumObjectList(enumObject: any): EnumObject[] {
		return Object.keys(enumObject).map(key => {
			return {
				key,
				value: enumObject[key]
			} as EnumObject;
		});
	}
}
