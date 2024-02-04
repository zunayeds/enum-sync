#! /usr/bin/env node

import { program } from "commander";

program
    .version('1.0.0')
    .description('A cross-platform enum generator')
    .requiredOption('-src, --source <directory>', 'Source Directory', setSource)
    .requiredOption('-src-lng --source-language <language>', 'Source Language', setSourceLanguage)
    .requiredOption('-dst, --destination <directory>', 'Destination Directory', setDestination)
    .requiredOption('-dst-lng --destination-language <language>', 'Destination Language', setDestinationLanguage);

function setSource(directory: string): void {
    console.log('This is the source', directory);
}

function setSourceLanguage(language: string): void {
    console.log('This is the source language', language);
}

function setDestination(directory: string): void {
    console.log('This is the destination', directory);
}

function setDestinationLanguage(language: string): void {
    console.log('This is the destination language', language);
}

program.parse(process.argv);