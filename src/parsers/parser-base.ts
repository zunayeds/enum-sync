import { EnumType } from "../enums";
import { GenericEnum, GenericEnumItem } from "../models";

export abstract class EnumParserBase {
    abstract parseFileContent(fileContent: string): GenericEnum[];
    abstract parseEnumBody(enumBody: string): GenericEnumItem[];

    determineEnumType(items: GenericEnumItem[]): EnumType {
        let hasNumber = false;
        let hasString = false;

        for (const item of items) {
            if (typeof item.value === 'number') {
                hasNumber = true;
            } else if (typeof item.value === 'string') {
                hasString = true;
            }
        }

        if (hasNumber && hasString) return EnumType.Heterogeneous;

        if (!hasNumber && hasString) return EnumType.String;

        if (hasNumber && !hasString) {
            const allNumericSequential = items.every((item, index) => typeof item.value === 'number' && item.value === index);
            if (allNumericSequential) return EnumType.General;

            const allNumeric = items.every((item) => typeof item.value === 'number');
            if (allNumeric) return EnumType.Numeric;

            return EnumType.PartiallyNumeric;
        }
        
        return EnumType.General;
    }
}