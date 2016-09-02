'use strict';

module.exports = {

  node: function () {

    this.installDependencies({
      bower: false,
      npm: true
    });

  },

  patternlab: function () {

    // We run this non interactivly to prevent the starterkit selection message
    // being lost in the possible NPM noise.
    this.spawnCommand(
      'composer', [
        'create-project',
        'pattern-lab/edition-twig-standard',
        'styleguide',
        '--no-interaction'
       ]
    )

  }

}
