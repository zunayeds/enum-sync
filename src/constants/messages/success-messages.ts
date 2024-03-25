import { StringHelper } from "../../utilities";

export const FILE_GENERATION_SUCCESS_FORMAT_MESSAGE = (fileNames: string[]) =>
	`Generated file(s): ${StringHelper.convertToCommaSeparatedString(fileNames)}`;