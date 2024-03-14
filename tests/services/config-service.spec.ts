import { ConfigService } from '../../src/services/config-service';
import {
	DEFAULT_GENERATOR_CONFIGURATION,
	GENERATOR_STORED_OBJECT_NAME
} from '../../src/constants';
import {
	INVALID_CONFIG_KEY_MESSAGE,
	INVALID_CONFIG_VALUE_TYPE_MESSAGE
} from '../../src/constants/messages/error-messages';

jest.mock('../../src/constants', () => ({
	DEFAULT_GENERATOR_CONFIGURATION: {},
	GENERATOR_STORED_OBJECT_NAME: 'test'
}));

describe('ConfigService', () => {
	let getProjectConfigSpy: jest.SpyInstance;

	beforeEach(() => {
		getProjectConfigSpy = jest.spyOn(
			ConfigService as any,
			'getProjectConfig'
		);
	});

	afterEach(() => {
		getProjectConfigSpy.mockRestore();
	});

	describe('getConfigurations', () => {
		it('should get configurations', async () => {
			getProjectConfigSpy.mockResolvedValue({
				get: jest
					.fn()
					.mockReturnValueOnce(DEFAULT_GENERATOR_CONFIGURATION)
			});

			const config = await ConfigService.getConfigurations();

			expect(config).toEqual(DEFAULT_GENERATOR_CONFIGURATION);
			expect(getProjectConfigSpy).toHaveBeenCalled();
		});

		it('should return default configuration if no configuration exists', async () => {
			getProjectConfigSpy.mockResolvedValue({
				get: jest.fn().mockReturnValueOnce(null)
			});

			const config = await ConfigService.getConfigurations();

			expect(config).toEqual(DEFAULT_GENERATOR_CONFIGURATION);
			expect(getProjectConfigSpy).toHaveBeenCalled();
		});
	});

	describe('getSpecificConfiguration', () => {
		let getProjectConfigSpy: jest.SpyInstance;

		beforeEach(async () => {
			getProjectConfigSpy = jest.spyOn(
				ConfigService as any,
				'getProjectConfig'
			);
			getProjectConfigSpy.mockImplementation(() =>
				Promise.resolve({
					separateFileForEachType: true
				})
			);
		});

		it('should get a specific configuration', async () => {
			const mockConfig = {
				get: jest.fn().mockReturnValue(true)
			};
			getProjectConfigSpy.mockResolvedValue(mockConfig as any);

			const result = await ConfigService.getSpecificConfiguration(
				'separateFileForEachType'
			);

			expect(result).toBe(true);
			expect(mockConfig.get).toHaveBeenCalledWith(
				'test.separateFileForEachType'
			);
		});
	});

	describe('setConfigurations', () => {
		let getSchemaSpy: jest.SpyInstance;
		let convertValueSpy: jest.SpyInstance;

		beforeEach(async () => {
			getSchemaSpy = jest.spyOn(ConfigService as any, 'getSchema');
			getSchemaSpy.mockReturnValue({
				separateFileForEachType: true
			});
			convertValueSpy = jest.spyOn(ConfigService as any, 'convertValue');
		});

		it('should set configurations', async () => {
			const mockConfig = {
				set: jest.fn()
			};
			const mockSchema = {
				type: 'boolean'
			};
			getProjectConfigSpy.mockResolvedValue(mockConfig as any);
			getSchemaSpy.mockReturnValue(mockSchema as any);
			convertValueSpy.mockReturnValue(false);

			await ConfigService.setConfigurations({
				separateFileForEachType: false
			});

			expect(mockConfig.set).toHaveBeenCalledWith(
				'separateFileForEachType',
				false
			);
		});

		it('should throw an error if the key is invalid', async () => {
			const mockConfig = {
				set: jest.fn()
			};
			getProjectConfigSpy.mockResolvedValue(mockConfig as any);
			getSchemaSpy.mockReturnValue(null);

			await expect(
				ConfigService.setConfigurations({
					invalidKey: 'mockValue'
				} as any)
			).rejects.toThrow(INVALID_CONFIG_KEY_MESSAGE('invalidKey'));
		});

		it('should throw error if get error from convertValue function', async () => {
			const mockConfig = {
				set: jest.fn()
			};
			const mockSchema = {
				type: 'boolean'
			};
			const mockError = new Error(
				INVALID_CONFIG_VALUE_TYPE_MESSAGE(
					'separateFileForEachType',
					'boolean'
				)
			);
			convertValueSpy.mockImplementation(() => {
				throw mockError;
			});
			getProjectConfigSpy.mockResolvedValue(mockConfig as any);
			getSchemaSpy.mockReturnValue(mockSchema as any);

			await expect(
				ConfigService.setConfigurations({
					separateFileForEachType: 'invalidValue' as any
				})
			).rejects.toThrow(mockError);
		});

		it('should throw an error if the value type is invalid', async () => {
			const mockConfig = {
				set: jest.fn().mockImplementation(() => {
					throw new Error();
				})
			};
			const mockSchema = { type: 'boolean' };
			getProjectConfigSpy.mockResolvedValue(mockConfig as any);
			getSchemaSpy.mockReturnValue(mockSchema as any);

			await expect(
				ConfigService.setConfigurations({
					separateFileForEachType: 'invalidValue' as any
				})
			).rejects.toThrow(
				INVALID_CONFIG_VALUE_TYPE_MESSAGE(
					'separateFileForEachType',
					'boolean'
				)
			);
		});

		it('should throw an error if the converted value type is somehow invalid', async () => {
			const mockConfig = {
				set: jest.fn().mockImplementation(() => {
					throw new Error();
				})
			};
			const mockSchema = {
				type: 'boolean'
			};
			getProjectConfigSpy.mockResolvedValue(mockConfig as any);
			getSchemaSpy.mockReturnValue(mockSchema as any);
			convertValueSpy.mockReturnValue('invalidValue' as any);

			await expect(
				ConfigService.setConfigurations({
					separateFileForEachType: 'true' as any
				})
			).rejects.toThrow(
				INVALID_CONFIG_VALUE_TYPE_MESSAGE(
					'separateFileForEachType',
					'boolean'
				)
			);
		});
	});

	describe('initialize', () => {
		it('should initialize configuration', async () => {
			getProjectConfigSpy.mockResolvedValue({
				get: jest.fn().mockReturnValueOnce(null),
				set: jest.fn()
			});

			await ConfigService.initialize();

			expect(getProjectConfigSpy).toHaveBeenCalled();
		});

		it('should not initialize configuration if it already exists', async () => {
			getProjectConfigSpy.mockResolvedValue({
				get: jest
					.fn()
					.mockReturnValueOnce(DEFAULT_GENERATOR_CONFIGURATION),
				set: jest.fn()
			});

			await ConfigService.initialize();

			expect(getProjectConfigSpy).toHaveBeenCalled();
		});
	});
});
