import { EnumType } from "../enums";
import { GenericEnum, GenericEnumItem } from "../models";

export abstract class EnumParserBase {
    abstract parseFile(fileContent: string): GenericEnum[];
    abstract parseEnumBody(enumBody: string): GenericEnumItem[];

    determineEnumType(items: GenericEnumItem[]): EnumType {
        let hasNumeric = false;
        let hasString = false;

        for (const item of items) {
            if (typeof item.value === 'number') {
                hasNumeric = true;
            } else if (typeof item.value === 'string') {
                hasString = true;
            }
        }

        if (hasNumeric && hasString) return EnumType.Heterogeneous;

        if (!hasNumeric && hasString) return EnumType.String;

        if (hasNumeric && !hasString) {
            const allNumericSequential = items.every((item, index) => typeof item.value === 'number' && item.value === index);
            if (allNumericSequential) return EnumType.General;

            const allNumeric = items.every((item) => typeof item.value === 'number');
            if (allNumeric) return EnumType.Numeric;

            return EnumType.PartiallyNumeric;
        }
        
        return EnumType.General;
    }
}