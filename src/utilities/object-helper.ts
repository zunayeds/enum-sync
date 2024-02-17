export abstract class ObjectHelper {
	public static convertToList(obj: Record<string, any>): void {
		const maxLength = Math.max(...Object.keys(obj).map(key => key.length));

		console.log('Key'.padEnd(maxLength + 5) + 'Value');
		console.log('-'.repeat(maxLength * 2));

		for (const key in obj) {
			const value = obj[key];
			console.log(key.padEnd(maxLength + 5) + value);
		}
	}
}
