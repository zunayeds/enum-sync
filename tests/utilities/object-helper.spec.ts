import { LogService } from '../../src/services';
import { ObjectHelper } from '../../src/utilities';

jest.mock('../../src/services/log-service.ts');

describe('ObjectHelper', () => {
	describe('convertToTable', () => {
		it('should log the object keys and values in table format', () => {
			// Arrange
			const obj = { key1: 'value1', key2: 'value2' };
			const logSpy = jest.spyOn(LogService, 'showInfoMessage');

			// Act
			ObjectHelper.convertToTable(obj);

			// Assert
			expect(logSpy).toHaveBeenNthCalledWith(1, 'Key      Value');
			expect(logSpy).toHaveBeenNthCalledWith(2, '-------------------');
			expect(logSpy).toHaveBeenNthCalledWith(3, 'key1     value1');
			expect(logSpy).toHaveBeenNthCalledWith(4, 'key2     value2');

			// Cleanup
			logSpy.mockRestore();
		});
	});
});
