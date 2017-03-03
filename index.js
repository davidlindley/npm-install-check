const spawn = require('child_process');
const fs = require('fs');
const currentPack = 'package.json';
const oldPack = '_package.old.json';

/**
 * @name filesTheSame
 * @desc Checks if two files are the same
 * @param {string} file1 - Path to first file
 * @param {string} file2 - Path to second file
 * @returns {Promise} resolves to boolean, true if files are the same
 */
_filesTheSame = (file1, file2) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file1, {encoding: 'utf-8'}, (err1, data1) => {
      if (!err1) {
        fs.readFile(file2, {encoding: 'utf-8'}, (err2, data2) => {
          if (!err2) {
            resolve(data1 === data2);
          } else {
            reject(err2);
          }
        });
      } else {
        reject(err1);
      }
    });
  });
}

/**
 * @name copyFile
 * @desc Copies src into dest
 * @param {string} src - Path to file to copy
 * @param {string} dest - Path to destination
 * @returns {Promise} resolves when file is copied
 */
_copyFile = (src, dest) => {
  return new Promise((resolve, reject) => {
    fs.readFile(src, {encoding: 'utf-8'}, (err, data) => {
      if (!err) {
        fs.writeFile(dest, data, (err) => {
          if (!err) {
            resolve();
          } else {
            reject();
          }
        });
      } else {
        reject(err);
      }
    });
  });
}

/**
 * @name runNpmInstall
 * @desc Runs NPM install sync
 */
_runNpmInstall = () => {
  console.log('Running npm install')
  spawn.execSync('npm install', {stdio:[0,1,2]});
}

/*
* App starts here
*/
npmInstallCheck = () => {
  // Checks if oldPack exists
  if (fs.existsSync(oldPack)) {
    // Compares oldPack with newPack
    _filesTheSame(currentPack, oldPack)
      .then((same) => {
        if (!same) {
          console.log(`There have been changes to ${currentPack}`);
          // Files not the same, copy new file
          _copyFile(currentPack, oldPack)
            .then(() => {
              console.log(`${currentPack} copied to ${oldPack}`);
            })
            .catch((error) => {
              console.log(error);
            });

          // Run npm install
          _runNpmInstall();
        } else {
          console.log(`No changes to ${currentPack}. No install needed.`);
        }
      })
      .catch((err) => {
        console.log(err);
        // Run npm install
        _runNpmInstall();
      });
  } else {
    console.log(`File ${oldPack} doesn't exist.`)
    // File does not exist. Copy package.json
    _copyFile(currentPack, oldPack)
      .then(() => {
        console.log(`${currentPack} copied to ${oldPack}`);
      })
      .catch((error) => {
        console.log(error);
      });
    // Run npm install
    _runNpmInstall();
  }
}

// Exports for npm module
module.exports = npmInstallCheck;
