import { EnumParserBase } from ".";
import { GenericEnum, GenericEnumItem } from "../models";


export class JavaScriptParser extends EnumParserBase {
    // Parses the enum definitions from a string, considering optional 'export' and trailing semicolons.
    public parseFileContent(fileContent: string): GenericEnum[] {
        // Adjusted regex to match optional 'export' and semicolon at the end of the enum declaration
        const enumRegex = /(?:export\s+)?enum\s+(\w+)\s*\{([^}]+)\}\s*;?/g;
        let match;
        const parsedEnums: GenericEnum[] = [];

        while ((match = enumRegex.exec(fileContent)) !== null) {
            const enumName = match[1];
            const enumBody = match[2];
            const enumItems = this.parseEnumBody(enumBody);
            const enumType = this.determineEnumType(enumItems);
            parsedEnums.push({
                name: enumName,
                type: enumType,
                items: enumItems
            });
        }

        return parsedEnums;
    }

    // Parses the body of an enum definition and returns an array of GenericEnumItem.
    public parseEnumBody(enumBody: string): GenericEnumItem[] {
        const itemRegex = /(\w+)\s*(?:=\s*([^,]+))?/g;
        let match;
        const items: GenericEnumItem[] = [];
        let lastNumericValue = -1; // Start before 0, as the first value (if not set) should be 0.
    
        while ((match = itemRegex.exec(enumBody)) !== null) {
            const itemName = match[1];
            const itemValueStr = match[2];
            let itemValue: string | number;
        
            if (itemValueStr !== undefined) {
                // Check if the value is numeric or a string and remove quotes if necessary
                const parsedValue = itemValueStr.trim().startsWith("'") || itemValueStr.trim().startsWith('"')
                ? itemValueStr.trim().slice(1, -1)
                : isNaN(Number(itemValueStr)) ? itemValueStr.trim() : Number(itemValueStr);
        
                itemValue = parsedValue;
                if (typeof parsedValue === 'number') {
                lastNumericValue = parsedValue;
                }
            } else {
                // If no value is explicitly set, increment from the last numeric value
                itemValue = ++lastNumericValue;
            }
        
            items.push({ name: itemName, value: itemValue });
        }

        return items;
    }
}