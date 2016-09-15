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

describe("deck:app", () => {

  describe('basic theme scaffolding', () => {

    before(() => {

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

    it('creates core Drupal files', () => {

      expect(file('deck.info.yml')).to.exist;
      expect(file('deck.theme')).to.exist;
      expect(file('deck.breakpoints.yml')).to.exist;
      expect(file('screenshot.png')).to.exist;
      expect(file('deck.libraries.yml')).to.exist;

    });

    it('writes a basic info file', () => {

      var fixture = path.join(__dirname, 'fixtures', 'basic.info.yml');

      expect(file('deck.info.yml')).to.equal(file(fixture));

    });

    it('writes a basic theme file', () => {

      var fixture = path.join(__dirname, 'fixtures', 'basic.theme');

      expect(file('deck.theme')).to.equal(file(fixture));

    });

    it("writes the template directories", () => {

      expect(dir('hooks/alter')).to.exist;
      expect(dir('hooks/preprocess')).to.exist;
      expect(dir('hooks/alter')).to.exist;

    });

    it("adds default templates", () => {

      expect(file('templates/content/page-title.html.twig')).to.exist;

    });

    it("creates a .gitignore", () => {

      expect(file('.gitignore')).to.exist;

    });

  });

  describe('configured theme scaffolding', () => {

    before(() => {

      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          'themeName': 'Mast',
          'themeMachineName': 'mast',
          'themeDescription': 'A really cool theme starter.',
          'baseTheme': 'stable',
          'bourbonNeat': false
        })
        .toPromise();

    });


    it('creates configured theme files', () => {

      expect(file('deck.info.yml')).to.not.exist;
      expect(file('deck.theme')).to.not.exist;
      expect(file('deck.breakpoints.yml')).to.not.exist;
      expect(file('screenshot.png')).to.exist;
      expect(file('deck.libraries.yml')).to.not.exist;

      expect(file('mast.info.yml')).to.exist;
      expect(file('mast.theme')).to.exist;
      expect(file('mast.breakpoints.yml')).to.exist;
      expect(file('screenshot.png')).to.exist;
      expect(file('mast.libraries.yml')).to.exist;

    });


    it('writes the specified base theme to the info file', () => {

      expect(file('mast.info.yml')).to.not.contain('base theme: classy');
      expect(file('mast.info.yml')).to.contain('base theme: stable');

    });


  });

  describe('assets', () => {

    it("creates a package.json", () => {

      expect(file('package.json')).to.exist;

    });

    it("scaffolds the asset structure", () => {

      expect(dir('assets/src/sass')).to.exist;
      expect(dir('assets/src/js')).to.exist;
      expect(dir('assets/src/fonts')).to.exist;
      expect(dir('assets/src/images')).to.exist;

    });

    it("scaffolds configuration files", () => {

      expect(file('tsconfig.json')).to.exist;

    });


    describe('SASS', () => {

      describe('with Bourbon/Neat', () => {

        before(() => {

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

        it("imports Bourbon/Neat", () => {

          const mainSassFile = 'assets/src/sass/main.scss';

          expect(file(mainSassFile)).to.contain('@import "bourbon";');
          expect(file(mainSassFile)).to.contain('@import "utils/settings/grid";');
          expect(file(mainSassFile)).to.contain('@import "neat";');

        });

      });

      describe('without Bourbon/Neat', () => {

        before(() => {

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

        it("does not import Bourbon/Neat", () => {

          const mainSassFile = 'assets/src/sass/main.scss';

          expect(file(mainSassFile)).to.not.contain('@import "bourbon";');
          expect(file(mainSassFile)).to.not.contain('@import "utils/settings/grid";');
          expect(file(mainSassFile)).to.not.contain('@import "neat";');

        });

      });

    });

  });

});
