import { CodeFile, GenericEnum } from '../models';

export abstract class EnumConverterBase {
	abstract convertEnumsToString(genericEnums: GenericEnum[]): string;
	abstract convertEnumsToFiles(genericEnums: GenericEnum[]): CodeFile[];
	abstract convertEnum(genericEnum: GenericEnum): string;
}
