import { FolderService } from '../../src/services/folder-service';
import { existsSync, readdirSync, statSync } from 'fs';

jest.mock('fs');

describe('FolderService', () => {
	beforeEach(() => {
		jest.mock('fs', () => ({
			statSync: jest.fn()
		}));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getFiles', () => {
		it('should get files', () => {
			const mockFolderPath = 'path/to/folder';
			const mockFileExtension = 'txt';
			const mockFiles = ['file1.txt', 'file2.txt'];

			(existsSync as jest.Mock).mockReturnValue(true);
			(readdirSync as jest.Mock).mockReturnValue(mockFiles);

			const result = FolderService.getFiles(
				mockFolderPath,
				mockFileExtension
			);

			expect(existsSync).toHaveBeenCalledWith(mockFolderPath);
			expect(readdirSync).toHaveBeenCalledWith(mockFolderPath, {
				recursive: true
			});
			expect(result).toEqual(
				mockFiles.map(file => `${mockFolderPath}/${file}`)
			);
		});

		it('should throw error if folder path does not exist', () => {
			const mockFolderPath = 'invalid\\folder\\path';
			const mockFileExtension = 'txt';
			(existsSync as jest.Mock).mockReturnValue(false);

			// Act and Assert
			expect(() => {
				try {
					FolderService.getFiles(mockFolderPath, mockFileExtension);
				} catch (error: unknown) {
					expect(error).toBeInstanceOf(Error);
					expect((error as Error).message).toBe(
						`Folder path "${mockFolderPath}" does not exist`
					);
					throw error;
				}
			}).toThrow();
		});
	});

	describe('getSeparator', () => {
		it('should get separator for windows folder path', () => {
			const mockFolderPathWindows = 'path\\to\\folder';

			expect(FolderService.getSeparator(mockFolderPathWindows)).toBe(
				'\\'
			);
		});

		it('should get separator for unix folder path', () => {
			const mockFolderPathUnix = 'path/to/folder';

			expect(FolderService.getSeparator(mockFolderPathUnix)).toBe('/');
		});
	});

	describe('isValidDirectory', () => {
		it('should validate directory', () => {
			const mockFolderPath = 'path/to/folder';

			(statSync as jest.Mock).mockReturnValue({
				isDirectory: () => true
			});

			const result = FolderService.isValidDirectory(mockFolderPath);

			expect(statSync).toHaveBeenCalledWith(mockFolderPath);
			expect(result).toBe(true);
		});

		it('should return false if path is not a directory', () => {
			const mockFolderPath = 'not-a-directory';

			(statSync as jest.Mock).mockImplementation(() => {
				throw new Error('Mocked error');
			});

			const result = FolderService.isValidDirectory(mockFolderPath);

			expect(result).toBe(false);
		});
	});
});
