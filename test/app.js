'use strict';

// Chai imports.
const chai = require('chai');
const expect = chai.expect;
const chaiFiles = require('chai-files');
chai.use(chaiFiles);
const file = chaiFiles.file;

// Other imports.
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs');

describe("deck:app", function () {

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'themeName': 'Deck',
        'themeMachineName': 'deck',
        'themeDescription': 'A really cool theme starter.',
        'baseTheme': 'classy',
        'bourbonNeat': true
      })
      .toPromise();
  });

  describe('basic theme scaffolding', function () {

    it('creates core Drupal files', function () {
      assert.file([
        'deck.info.yml',
        'deck.theme',
        'deck.breakpoints.yml',
        'screenshot.png',
        'deck.libraries.yml'
      ]);
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

    it('writes a configurable base theme', function () {

      assert.fileContent('deck.info.yml', 'base theme: classy');

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

    it("creates a .gitignore", function (done) {

      var fixture = path.join(__dirname, 'fixtures', 'gitignore');

      fs.readFile(fixture, function (err, data) {
        if (err) {
          throw err;
        }

        assert.fileContent('.gitignore', data.toString());
        done();
      });

    });

  });

  describe('assets', function () {

    it("scaffolds a package.json", function () {

      assert.jsonFileContent('package.json', require('./fixtures/package.json'));

    });

    it("scaffolds the asset structure", function () {

      assert.file([
        'assets/src/sass',
        'assets/src/js',
        'assets/src/fonts',
        'assets/src/images'
      ]);

    });

    it("scaffolds configuration files", function () {
      assert.file([
        'tsconfig.json'
      ]);
    });

    describe('SASS with Bourbon specified', function () {

      before(function () {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({
            'themeName': 'Deck',
            'themeMachineName': 'deck',
            'themeDescription': 'A really cool theme starter.',
            'baseTheme': 'classy',
            'bourbonNeat': true
          })
          .toPromise();
      });

      it("installs Bourbon/Neat if specified", function () {
        const mainSassFile = 'assets/src/sass/main.scss';
        expect(file(mainSassFile)).to.contain('@import "bourbon";');
        expect(file(mainSassFile)).to.contain('@import "utils/settings/grid";');
        expect(file(mainSassFile)).to.contain('@import "neat";');
      });

    });

    describe('SASS with no bourbon specified', function () {

      before(function () {
        return helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({
            'themeName': 'Deck',
            'themeMachineName': 'deck',
            'themeDescription': 'A really cool theme starter.',
            'baseTheme': 'classy',
            'bourbonNeat': false
          })
          .toPromise();
      });

      it("does not install Bourbon/Neat if unrequired", function () {
        const mainSassFile = 'assets/src/sass/main.scss';
        expect(file(mainSassFile)).to.not.contain('@import "bourbon";');
        expect(file(mainSassFile)).to.not.contain('@import "utils/settings/grid";');
        expect(file(mainSassFile)).to.not.contain('@import "neat";');
      });

    });

  });

});
