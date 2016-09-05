'use strict';

const spawnCommandPromise = require('../../../helpers/spawnCommandPromise');

module.exports = {

  node: function () {

    this.installDependencies({
      bower: false,
      npm: true
    });

  },

  patternlab: function () {

    // The skip install option is only useful if installing via NPM or Bower,
    // it doesn't take effect for standard or wrapped spawns.
    if (this.options.skipInstall) {
      return;
    }

    // We want this so that we can configure PatternLab inside the installation,
    // rather then splitting over both the Install and End run contexts.
    // We've also created a helper method for wrapping spawned commands as
    // promises, so that we can configure PatternLab after it's been installed.
    const command = spawnCommandPromise('composer', [
        'create-project',
        'pattern-lab/edition-twig-standard',
        'styleguide',
        '--no-interaction',
        '--quiet'
       ])

    command.then(() => {
        spawnCommandPromise(
          'php',
          [
            'core/console',
            '--generate'
          ],
          {
            cwd: 'styleguide'
          }
        )
    });


  }

}
