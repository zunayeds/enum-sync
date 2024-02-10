import { EnumConverterBase } from ".";
import { EnumType } from "../enums";
import { StringHelper, TypeHelper } from "../helpers";
import { DART_CONFIGURATION } from "../language-configurations";
import { CodeFile, GenericEnum } from "../models";
import { FileProcessor } from "../processors";

export class DartConverter extends EnumConverterBase {
    public convertEnumsToString(genericEnums: GenericEnum[]): string {
        let fileContent: string = '';

        genericEnums.forEach(genericEnum => {
            fileContent += '\n\n';
            fileContent += this.convertEnum(genericEnum);
        });

        fileContent = fileContent.replace(/^\n\n/, '');
        
        return fileContent;
    }

    public convertEnumsToFiles(genericEnums: GenericEnum[]): CodeFile[] {
        let fileContents: CodeFile[] = [];

        genericEnums.forEach(genericEnum => {
            const content = this.convertEnum(genericEnum);
            
            fileContents.push({
                fileName: FileProcessor.generateFileName(genericEnum.name, DART_CONFIGURATION),
                fileContent: content
            });
        });
        
        return fileContents;
    }

    convertEnum(genericEnum: GenericEnum): string {
        let fileContent: string = '';

        if (genericEnum.type === EnumType.General) {
            fileContent += `enum ${genericEnum.name} {`;

            genericEnum.items.forEach(enumItem => {
                fileContent += `\n\t${enumItem.name},`;
            });
        } else {
            fileContent += `abstract class ${genericEnum.name} {`;

            genericEnum.items.forEach(enumItem => {
                fileContent += '\n\t';
                const isNumber = TypeHelper.isNumber(enumItem.value);
                fileContent += `static ${isNumber ? 'int' : 'String'} get ${enumItem.name} => ${isNumber ? enumItem.value : StringHelper.addQuotation(enumItem.value)};`;
            });
        }

        fileContent += '\n}';

        return fileContent;
    }
}