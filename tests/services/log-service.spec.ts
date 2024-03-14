import { LogService } from '../../src/services/log-service';

describe('LogService', () => {
	let consoleLogSpy: jest.SpyInstance;
	let consoleErrorSpy: jest.SpyInstance;
	let getChalkInstanceSpy: jest.SpyInstance;

	beforeEach(async () => {
		consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
		consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
		getChalkInstanceSpy = jest.spyOn(LogService as any, 'getChalkInstance');
		getChalkInstanceSpy.mockImplementation(() =>
			Promise.resolve({
				green: jest.fn(message => message),
				yellow: jest.fn(message => message),
				red: jest.fn(message => message)
			})
		);
	});

	afterEach(() => {
		consoleLogSpy.mockRestore();
		consoleErrorSpy.mockRestore();
		getChalkInstanceSpy.mockRestore();
	});

	it('should log info messages', () => {
		LogService.showInfoMessage('info');
		expect(consoleLogSpy).toHaveBeenCalledWith('info');
	});

	it('should log success messages', async () => {
		await LogService.showSuccessMessage('success');
		expect(consoleLogSpy).toHaveBeenCalled();
	});

	it('should log warning messages', async () => {
		await LogService.showWarningMessage('warning');
		expect(consoleLogSpy).toHaveBeenCalled();
	});

	it('should log error messages', async () => {
		await LogService.showErrorMessage('error');
		expect(consoleErrorSpy).toHaveBeenCalled();
	});
});
