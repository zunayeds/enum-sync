import { error } from 'console';
import { existsSync, readdirSync, statSync } from 'fs';

export abstract class FolderService {
	private constructor() {}

	public static getFiles(
		folderPath: string,
		fileExtension: string,
		isRecursive: boolean = true
	): string[] {
		if (existsSync(folderPath)) {
			const files = readdirSync(folderPath, {
				recursive: isRecursive
			}) as string[];
			return files
				.filter(
					file => (file.split('.').pop() as string) === fileExtension
				)
				.map(
					file =>
						`${folderPath}${this.getSeparator(folderPath)}${file}`
				);
		}

		throw error(`Folder path "${folderPath}" does not exist`);
	}

	public static getSeparator(folderPath: string) {
		return folderPath.includes('/') ? '/' : '\\';
	}

	public static isValidDirectory(folderPath: string) {
		try {
			const stat = statSync(folderPath);
			return stat.isDirectory();
		} catch (error: unknown) {
			return false;
		}
	}
}
