# npm-install-check
Checks if a npm install is needed. Useful for auto deployments as npm install can be time consuming.

## Installation
With [NPM](https://www.npmjs.com/package/npm-install-check):
```zsh
npm install -g npm-install-check
```

# Usage
`npm-install-check`
Or
`conditional-npm-install` (LEGACY)

# How it works
It will check for the `package.json` file and compare it with a old version `_package.old.json`.
If there are any differences between the two then it will run an npm install in a `child process`
