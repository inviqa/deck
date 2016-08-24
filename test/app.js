'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');

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

  it('writes a basic info file', function (done) {
    var fixture = path.join(__dirname, 'fixtures', 'basic.info.yml');

    fs.readFile(fixture, function (err, data) {
      if (err) {
        throw err;
      }

      assert.fileContent('deck.info.yml', data.toString());
      done();
    });

  });

});
