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

### Manage configurations

Enum Generator allows you to manage your configurations easily. To list all configurations, use the `config list` command:

```sh
enum-generator config list
```

You can also set configurations for the generator. To set specific configurations as key-value pairs, use the `config set` command:

```sh
enum-generator config set key1=value1 key2=value2 ...
```

### Generate enums

To generate enums, you need to provide a source file and a target file. Use the `gen` command followed by the `--source` and `--target` flags:

```sh
enum-generator gen --source sourceDirectory --target targetDirectory
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the Apache License. See [LICENSE](LICENSE) for more details.
