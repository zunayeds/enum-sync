import { FileGenerationInfo } from "../models";

export abstract class GeneratorService {
	/* istanbul ignore next */
	constructor() {}

	private static generatedFiles: string[] = [];
	private static invalidSourceFiles: string[] = [];
	private static generationFailedFiles: string[] = [];
	private static invalidEnums: string[] = [];
	private static unsupportedEnums: string[] = [];

	public static addGeneratedFile(name: string): void {
		this.generatedFiles.push(name);
	}

	public static addInvalidSourceFile(name: string): void {
		this.invalidSourceFiles.push(name);
	}

	public static addGenerationFailedFile(name: string): void {
		this.generationFailedFiles.push(name);
	}

	public static addInvalidEnum(name: string): void {
		if (!this.invalidEnums.includes(name)) {
			this.invalidEnums.push(name);
		}
	}

	public static addUnsupportedEnum(name: string): void {
		if (!this.unsupportedEnums.includes(name)) {
			this.unsupportedEnums.push(name);
		}
	}

	public static getFileGenerationInfo(): FileGenerationInfo {
		return {
			generatedFiles: this.generatedFiles,
			invalidEnums: this.invalidEnums,
			invalidSourceFiles: this.invalidSourceFiles,
			geneartionFailedFiles: this.generationFailedFiles,
			unsupportedEnums: this.unsupportedEnums
		};
	}
}
