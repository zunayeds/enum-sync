export interface FileGenerationInfo {
    generatedFiles: string[],
    invalidSourceFiles: string[],
    geneartionFailedFiles: string[],
    invalidEnums: string[],
    unsupportedEnums: string[]
}