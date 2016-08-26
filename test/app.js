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
          'deck.breakpoints.yml',
          'screenshot.png',
          'deck.libraries.yml'
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

  it('writes a basic theme file', function (done) {

    var fixture = path.join(__dirname, 'fixtures', 'basic.theme');

    fs.readFile(fixture, function (err, data) {
      if (err) {
        throw err;
      }

      assert.fileContent('deck.theme', data.toString());
      done();
    });

  });

  it("writes the template directories", function () {

    assert.file([
      'hooks/alter',
      'hooks/preprocess',
      'hooks/alter'
    ]);

  });

  it("adds default templates", function () {

    assert.file([
      'templates/content/page-title.html.twig'
    ]);

  });

  it("scaffolds the asset structure", function () {

    assert.file([
      'assets/src/sass',
      'assets/src/js',
      'assets/src/fonts',
      'assets/src/images'
    ]);

  });

  it("scaffolds a package.json", function () {

    // var fixture = require('fixtures/package.json');

    assert.jsonFileContent('package.json', require('./fixtures/package.json'))

  });

});

describe('assets', function () {

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'themeName': 'Deck',
        'themeMachineName': 'deck',
        'themeDescription': 'A really cool theme starter.'
      })
      .toPromise();
  });

  it('scaffolds compilable SASS', function () {




  });

});
