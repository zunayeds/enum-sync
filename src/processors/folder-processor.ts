import { error } from "console";
import { existsSync, readdirSync } from "fs";

export abstract class FolderProcessor {
    public static getFiles(folderPath: string, fileExtension: string, isRecursive: boolean = true): string[] {
        if (existsSync(folderPath)) {
            const files = readdirSync(folderPath, { recursive: isRecursive }) as string[];
            return files.filter(file => file.split('.').pop() as string === fileExtension);
        }

        throw error(`Folder path "${folderPath}" does not exist`);
    }
}