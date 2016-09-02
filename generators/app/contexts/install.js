'use strict';

const chalk = require('chalk');

module.exports = {

  node: function () {

    this.installDependencies({
      bower: false,
      npm: true
    });

  },

  patternlab: function () {

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
