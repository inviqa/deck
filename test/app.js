'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('basic theme scaffolding', function () {

    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          'themeName': 'Deck',
          'themeMachineName': 'deck',
          'themeDescription': 'A really cool theme starter.'
        })
        .toPromise();
    });

    it('creates core Drupal files', function () {
        assert.file([
          'deck.info.yml',
          'deck.theme',
          'deck.breakpoints.yml'
        ])
    });

});
