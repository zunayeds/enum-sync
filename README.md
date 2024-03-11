# Enum Generator

Enum Generator is a powerful, cross-platform command-line tool designed to generate enums in various programming languages. It's easy to use and highly configurable, making it a go-to solution for all your enum generation needs.

## Installation

To install Enum Generator, you need to ensure that you have the Node.js version `14.X.X` or higher installed on your machine. Once you have this, you can install Enum Generator globally with the following command:

```sh
npm install -g enum-generator
```

## Usage

### List all supported languages

To see a list of all the programming languages that Enum Generator supports, use the `lang` command:

```sh
enum-generator lang
```

Currently supported languages:

| Language        | Source | Target |
| --------------- | ------ | ------ |
| CSharp (cs)     | Yes    | No     |
| JavaScript (js) | Yes    | No     |
| TypeScript (ts) | Yes    | No     |
| Dart (dart)     | No     | Yes    |

### Manage configurations

Enum Generator allows you to manage your configurations easily. To list all configurations, use the `config list` command:

```sh
enum-generator config list
```

You can also set configurations for the generator. To set specific configurations as key-value pairs, use the `config set` command:

```sh
enum-generator config set key1=value1 key2=value2 ...
```

List of configuration property:

| Property                  | Type       | Description                                                   | Default |
| ------------------------- | ---------- | ------------------------------------------------------------- | ------- |
| `separateFileForEachType` | `boolean`  | Determines whether to generate a separate file for each type. | `true`  |
| `defaultSourceLanguage`   | `Language` | The default language of the source files.                     | `null`  |
| `defaultTargetLanguage`   | `Language` | The default language of the target files.                     | `null`  |

### Generate enums

To generate enums, you need to provide a source file and a target file. Use the `gen` command followed by the `-src` and `-tgt` flags:

```sh
enum-generator gen -src sourceDirectory -tgt targetDirectory
```

If `defaultSourceLanguage` and/or `defaultTargetLanguage` not configured using `config` command, you need to provide `-src-lang` and `-tgt-lang` flags:

```sh
enum-generator gen -src sourceDirectory -src-lang sourceLanguage -tgt targetDirectory -tgt-lang targetLanguage
```

Command paramterers:

| Parameter                     | Type     | Description                                                       | Required                                       |
| ----------------------------- | -------- | ----------------------------------------------------------------- | ---------------------------------------------- |
| `source`, `src`               | `string` | The source directory where the files to be processed are located. | Yes                                            |
| `source-language`, `src-lang` | `string` | The language of the source files.                                 | Yes, if `defaultSourceLanguage` not configured |
| `target`, `tgt`               | `string` | The target directory where the generated files will be written.   | Yes                                            |
| `target-language`, `tgt-lang` | `string` | The language of the generated files.                              | Yes, if `defaultTargetLanguage` not configured |

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the Apache License. See [LICENSE](LICENSE) for more details.
