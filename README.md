# npm-install-check
Checks if a npm install is needed. Useful for auto deployments as npm install can be time consuming.

# Usage
`conditional-npm-install`

# How it works
It will check for the `package.json` file and compare it with a old version `_package.old.json`.
If there are any differences between the two then it will run an npm install in a `child process`
