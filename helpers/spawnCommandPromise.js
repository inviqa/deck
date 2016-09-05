'use strict';

const Promise = require('bluebird');
const proc = require('child_process');

module.exports = (command, args, opts) => {

  // We can't use default paramaters here as they throw errors in NodeJS < 6.5.0
  opts = opts || {};
  args = args || [];

  return new Promise((resolve, reject) => {

    if (typeof command === 'undefined') {
      reject(new Error('Command must be provided'));
    }

    let spawned;

    spawned = proc.spawn(command, args, opts);

    // Handle any general CLI errors.
    spawned.on('error', err => {
      reject(new Error(`Error: ${err}`));
    })

    // When the process has ended, resolve or reject the promise.
    spawned.on('close', code => {

      if (code === 0) {
        resolve(code);
      }
      else {
        reject(new Error(`Process exited with status code ${code}`));
      }

    });

  });

}
