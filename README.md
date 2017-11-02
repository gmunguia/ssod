# SSOD

> _Singe source of documentation_ for projects using confluence.

SSOD automatically uploads markdown files to Confluence.

## Installation

```bash
$ npm install ssod --save-dev
```

## Configuration

Create a `.ssodrc` file in your project directory, with the following structure:

```json
{
  "source": ".",
  "ignore": ["node_modules", ".git"],
  "confluence": {
    "username": "your-username-here",
    "password": "your-password-here",
    "spaceKey": "FOO",
    "baseUrl": "https://your-sub-domain.atlassian.net/wiki",
    "rootPage": 1234
  }
}
```

- `source` [optional] is the relative path, from `cwd`, that SSOD uses to start the file search.
- `ignore` [optional] lists the name of files or folders that will be ignored in the search.
- `rootPage` is the ID of the page under with pages will be uploaded.

## Usage

Just run the main executable from your project directory: 

```bash
$ node node_modules/.bin/ssod
```
