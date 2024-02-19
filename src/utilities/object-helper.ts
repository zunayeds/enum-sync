export abstract class ObjectHelper {
	private constructor() {}

	public static convertToTable(obj: Record<string, any>): void {
		const keyValueGap = 5;
		const maxLength = Math.max(...Object.keys(obj).map(key => key.length));

		console.log('Key'.padEnd(maxLength + keyValueGap) + 'Value');
		console.log('-'.repeat(maxLength + keyValueGap * 3));

		for (const key in obj) {
			const value = obj[key];
			console.log(key.padEnd(maxLength + keyValueGap) + value);
		}
	}
}
