export abstract class GeneratorService {
	/* istanbul ignore next */
	constructor() {}

	public static invalidFiles: string[] = [];
	public static invalidEnums: string[] = [];

	public static addInvalidFile(name: string): void {
		if (!this.invalidFiles.includes(name)) {
			this.invalidFiles.push(name);
		}
	}

	public static addInvalidEnum(name: string): void {
		if (!this.invalidEnums.includes(name)) {
			this.invalidEnums.push(name);
		}
	}
}
