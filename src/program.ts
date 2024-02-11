#! /usr/bin/env node

import { program } from "commander";
import { GeneratorCommandService } from "./services/generator-command-service";

export abstract class Program {
    

    public static initialize() {
        program
            .version('1.0.0')
            .description('A cross-platform enum generator');
        
        program
            .command('gen')
            .description('Generate File(s)')
            .requiredOption('-src, --source <directory>', 'Source Directory')
            .requiredOption('-src-lng --source-language <language>', 'Source Language')
            .requiredOption('-dst --destination <directory>', 'Destination Directory')
            .requiredOption('-dst-lng --destination-language <language>', 'Destination Language')
            .action((cmd) => 
                GeneratorCommandService.generate(cmd.source, cmd.sourceLanguage, cmd.destination, cmd.destinationLanguage)
            );

        program.parse(process.argv);
    }
}