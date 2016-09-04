'use strict';

const chalk = require('chalk');
const Promise = require('bluebird');

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

    this.log(chalk.blue('Installing PatternLab...'));

    // We run this non interactivly to prevent the starterkit selection message
    // being lost in the possible NPM noise.
    return this.spawnCommandSync(
      'composer', [
        'create-project',
        'pattern-lab/edition-twig-standard',
        'styleguide',
        '--no-interaction',
        '--quiet'
       ]
    );

  }

}
