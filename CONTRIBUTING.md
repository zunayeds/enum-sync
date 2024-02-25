# Contributing to Enum Generator

To get up and running, install the dependencies:

```bash
npm install
```

## Adding a New Language

To add support for a new language, either for parsing or converting or both, you need to add a new enum in the [`language-enum.ts`](src/enums/language-enum.ts) file.

Here are the steps:

1. The enum item should be the name of the language in PascalCase and the value should be the short form of the language in lowercase. For example, for the Python language, the enum item would be `Python = 'py'`.
2. The new enum item should be placed in alphabetical order with the existing enum items.

After adding the new language enum, you will need to add a language configuration mapping.

### Adding a Language Configuration Mapping

To add a language configuration mapping for a new language, follow these steps:

1. Create a new file in the `constants/language-configurations` directory. The file name should be in the format `<language>-configuration.ts`, where `<language>` is the lowercase name of the language.
2. In the new file, import the `Language` enum from `../enums`.
3. Define a constant for the new language configuration. The constant should be an object that matches the `LanguageConfigurationBase` interface.
4. Export the new constant from the file.
5. Add an entry for the new language configuration in `constants/language-config-mappings.ts`.

Here is an example for a hypothetical Python language:

```typescript
// python-configuration.ts
import { Language } from '../../enums';
import { LanguageConfigurationBase } from '../../models';

export const PYTHON_CONFIGURATION: LanguageConfigurationBase = {
	// Configuration properties here
};
```

And in `constants/language-config-mappings.ts`:

```typescript
import { PYTHON_CONFIGURATION } from './language-configurations/python-configuration';

// Add to LANGUAGE_CONFIG_MAPPINGS
LANGUAGE_CONFIG_MAPPINGS[Language.Python] = PYTHON_CONFIGURATION;
```

After adding the language configuration you will need to implement the parsing and/or converting logic for the new language in the respective classes.

## Adding a Parser

To add a parser for a language, follow these steps:

1. Create a new file in the `parsers` directory. The file name should be in the format `<language>-parser.ts`, where `<language>` is the lowercase name of the language.
2. In the new file, import the `EnumParserBase` class from `parser-base.ts`.
3. Create a new class that extends `EnumParserBase`. The class name should be in the format `<Language>Parser`, where `<Language>` is the PascalCase name of the language.
4. Implement the `parseEnumBody` method in the new class. This method should take a string representing the body of an enum and return an array of `GenericEnumItem` objects.
5. Export the new class from the file.
6. Add an export for the new class in `parsers/index.ts`.

Here is an example for a hypothetical Python language:

```typescript
// python-parser.ts
import { EnumParserBase } from '.';
import { GenericEnumItem } from '../models';

export class PythonParser extends EnumParserBase {
	parseEnumBody(enumBody: string): GenericEnumItem[] {
		// Implement parsing logic here
	}
}
```

## Adding a Converter

To add a converter for a new language, follow these steps:

1. Create a new file in the `converters` directory. The file name should be in the format `<language>-converter.ts`, where `<language>` is the lowercase name of the language.
2. In the new file, import the `EnumConverterBase` class from `converter-base.ts`.
3. Create a new class that extends `EnumConverterBase`. The class name should be in the format `<Language>Converter`, where `<Language>` is the PascalCase name of the language.
4. Implement the `convertEnum` method in the new class. This method should take a `GenericEnum` object and return a string representing the converted enum in the new language.
5. Export the new class from the file.
6. Add an export for the new class in `converters/index.ts`.

Here is an example for a hypothetical Python language:

```typescript
// python-converter.ts
import { EnumConverterBase } from '.';
import { GenericEnum } from '../models';

export class PythonConverter extends EnumConverterBase {
	convertEnum(genericEnum: GenericEnum): string {
		// Implement conversion logic here
	}
}
```

## Adding a Language Engine Mapping

To add a language engine mapping for a new language or to update an existing one, follow these steps:

1. If the language is new, create a new file in the `constants/language-engine-configurations` directory. The file name should be in the format `<language>-engine-configuration.ts`, where `<language>` is the lowercase name of the language.
2. In the file, import the `Language` enum from `../../enums` and the parser and/or converter for the language.
3. Define a constant for the language engine configuration. The constant should be an object that matches the `LanguageEngineConfigurationBase` interface.
4. Export the constant from the file.
5. If the language already exists, update the existing configuration by adding the parser or converter that you just created.

Here is an example for a hypothetical Python language:

```typescript
// python-engine-configuration.ts
import { Language } from '../../enums';
import { LanguageEngineConfigurationBase } from '../../models';
import { PythonParser } from '../../parsers';
import { PythonConverter } from '../../converters';

export const PYTHON_ENGINE_CONFIGURATION: LanguageEngineConfigurationBase = {
	enumParser: new PythonParser(Language.Python),
	enumConverter: new PythonConverter(Language.Python)
};
```

And in `constants/language-engine-mappings.ts`:

```typescript
import { PYTHON_ENGINE_CONFIGURATION } from './language-engine-configurations/python-engine-configuration';

// Add in LANGUAGE_ENGINE_MAPPINGS
LANGUAGE_ENGINE_MAPPINGS[Language.Python] = PYTHON_ENGINE_CONFIGURATION;
```
