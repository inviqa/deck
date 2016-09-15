'use strict';

// Chai imports.
const chai = require('chai');
const expect = chai.expect;
const chaiFiles = require('chai-files');
chai.use(chaiFiles);
const file = chaiFiles.file;
const dir = chaiFiles.dir;

// Other imports.
const path = require('path');
const helpers = require('yeoman-test');

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

        expect(file('deck.info.yml')).to.exist;
        expect(file('deck.theme')).to.exist;
        expect(file('deck.breakpoints.yml')).to.exist;
        expect(file('screenshot.png')).to.exist;
        expect(file('deck.libraries.yml')).to.exist;

    });

    it('writes a basic info file', function () {

      var fixture = path.join(__dirname, 'fixtures', 'basic.info.yml');

      expect(file('deck.info.yml')).to.equal(file(fixture));

    });

    it('writes a basic theme file', function () {

      var fixture = path.join(__dirname, 'fixtures', 'basic.theme');

      expect(file('deck.theme')).to.equal(file(fixture));

    });

    it("writes the template directories", function () {

        expect(dir('hooks/alter')).to.exist;
        expect(dir('hooks/preprocess')).to.exist;
        expect(dir('hooks/alter')).to.exist;

    });

    it("adds default templates", function () {

      expect(file('templates/content/page-title.html.twig')).to.exist;

    });

    it("creates a .gitignore", function () {

      expect(file('.gitignore')).to.exist;

    });

  });

  describe('assets', function () {

    it("creates a package.json", function () {

      expect(file('package.json')).to.exist;

    });

    it("scaffolds the asset structure", function () {

        expect(dir('assets/src/sass')).to.exist;
        expect(dir('assets/src/js')).to.exist;
        expect(dir('assets/src/fonts')).to.exist;
        expect(dir('assets/src/images')).to.exist;

    });

    it("scaffolds configuration files", function () {

      expect(file('tsconfig.json')).to.exist;

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
