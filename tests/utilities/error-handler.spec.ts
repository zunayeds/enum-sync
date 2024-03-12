import { LogService } from '../../src/services';
import { ErrorHandler } from '../../src/utilities';

jest.mock('../../src/services/log-service.ts');

describe('ErrorHandler', () => {
	describe('handle', () => {
		it('should log the error message and stop the process if stopProcess is true', async () => {
			// Arrange
			const error = new Error('Test error');
			const logSpy = jest.spyOn(LogService, 'showErrorMessage');
			const exitSpy = jest
				.spyOn(process, 'exit')
				.mockImplementation((code?: number) => undefined as never);

			// Act
			await ErrorHandler.handle(error, true);

			// Assert
			expect(logSpy).toHaveBeenCalledWith(error.message);
			expect(exitSpy).toHaveBeenCalled();

			// Cleanup
			logSpy.mockRestore();
			exitSpy.mockRestore();
		});
	});
});
