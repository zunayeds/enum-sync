export abstract class GeneratorService {
	/* istanbul ignore next */
	constructor() {}

	private static invalidFiles: string[] = [];
	private static invalidEnums: string[] = [];
	private static unsupportedEnums: string[] = [];

	public static addInvalidFile(name: string): void {
		if (!this.invalidFiles.includes(name)) {
			this.invalidFiles.push(name);
		}
	}

	public static getInvalidFiles(): string[] {
		return this.invalidFiles;
	}

	public static addInvalidEnum(name: string): void {
		if (!this.invalidEnums.includes(name)) {
			this.invalidEnums.push(name);
		}
	}

	public static getInvalidEnums(): string[] {
		return this.invalidEnums;
	}

	public static addUnsupportedEnum(name: string): void {
		if (!this.unsupportedEnums.includes(name)) {
			this.unsupportedEnums.push(name);
		}
	}

	public static getUnsupportedEnums(): string[] {
		return this.unsupportedEnums;
	}
}
