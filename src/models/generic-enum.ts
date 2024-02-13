import { EnumType } from '../enums';

export interface GenericEnum {
	name: string;
	type: EnumType;
	items: GenericEnumItem[];
}

export interface GenericEnumItem {
	name: string;
	value: string | number;
}
