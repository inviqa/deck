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
          'screenshot.png'
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

});

// This is similar to the first suite, but is set up with configuration values
// changed to ensure templates are written correctly.
describe("configurable theme scaffolding", function () {

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'themeName': 'Dilithium',
        'themeMachineName': 'dilithium',
        'themeDescription': 'An almost really cool theme starter.'
      })
      .toPromise();
  });

  it("writes a configurable info file", function (done) {

    var fixture = path.join(__dirname, 'fixtures', 'configured.info.yml');

    assert.file('dilithium.info.yml');

    fs.readFile(fixture, function (err, data) {
      if (err) {
        throw err;
      }

      assert.fileContent('dilithium.info.yml', data.toString());
      done();
    });

  });

  it("writes a configurable theme file", function (done) {

    var fixture = path.join(__dirname, 'fixtures', 'configured.theme');

    assert.file('dilithium.theme')
    fs.readFile(fixture, function (err, data) {
      if (err) {
        throw err;
      }

      assert.fileContent('dilithium.theme', data.toString());
      done();
    });

  });

});

describe('asset and template scaffolding', function () {

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'themeName': 'Deck',
        'themeMachineName': 'deck',
        'themeDescription': 'A really cool theme starter.'
      })
      .toPromise();
  });

  it("scaffolds the asset structure", function () {

    assert.file([
      'assets/src/sass',
      'assets/src/js',
      'assets/src/fonts',
      'assets/src/images'
    ]);

  });

});
