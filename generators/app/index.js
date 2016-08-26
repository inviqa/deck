'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var path = require('path');
var slug = require('transliteration').slugify
var chalk = require('chalk');

var prompting = function () {

  this.log(yosay(
    'Let me build you a fabulously empty Drupal 8 theme.'
  ));

  var prompts = [
    {
      'type': 'input',
      'name': 'themeName',
      'message': 'Give your theme a human readable name',
      'default': process.cwd().split(path.sep).pop()
      },
    {
      'type': 'input',
      'name': 'themeMachineName',
      'message': 'Give your theme a machine name',
      'default': function (answers) {
        return slug(answers.themeName, {
          separator: '_'
        });
      }
    },
    {
      'type': 'input',
      'name': 'themeDescription',
      'message': 'Describe your theme',
      'default': function (answers) {
        return 'Default theme for ' + answers.themeName;
      }
    }
    ];

  // Capture the answers and store them on the generator instance.
  return this.prompt(prompts).then(function (props) {
    this.props = props
  }.bind(this));
}

var writing = function () {

  var templateVars = {
      theme: {
        name: this.props.themeName,
        machine: this.props.themeMachineName,
        description: this.props.themeDescription
      }
  };

  // Copy info file
  this.fs.copyTpl(
    this.templatePath('theme.info.yml'),
    this.destinationPath(this.props.themeMachineName + '.info.yml'),
    templateVars
  );

  // Copy theme file.
  this.fs.copyTpl(
    this.templatePath('theme.theme'),
    this.destinationPath(this.props.themeMachineName + '.theme'),
    templateVars
  );

  // Copy breakpoints file.
  this.fs.copy(
    this.templatePath('theme.breakpoints.yml'),
    this.destinationPath(this.props.themeMachineName + '.breakpoints.yml')
  );

  // Copy the default logo.
  this.fs.copy(
    this.templatePath('screenshot.png'),
    this.destinationPath('screenshot.png')
  );

  // Copy the assets.
  this.fs.copy(
    this.templatePath('assets'),
    this.destinationPath('assets'),
    { globOptions: { dot: true } }
  );

  // Copy the hook directories.
  this.fs.copy(
    this.templatePath('hooks'),
    this.destinationPath('hooks'),
    { globOptions: { dot: true } }
  );

  // Copy any default templates.
  this.fs.copy(
    this.templatePath('templates'),
    this.destinationPath('templates'),
    { globOptions: { dot: true } }
  );

  // Copy the libraries file.
  this.fs.copy(
    this.templatePath('theme.libraries.yml'),
    this.destinationPath(this.props.themeMachineName + '.libraries.yml')
  )

  // Copy the package.json
  this.fs.copyTpl(
    this.templatePath('package.json'),
    this.destinationPath('package.json'),
    templateVars
  )

}

var install = {
  node: function () {
    this.log(chalk.yellow('Installing NPM dependencies...'))
    this.npmInstall()
  }
}

module.exports = yeoman.Base.extend({

  prompting: prompting,

  writing: writing,

  install: install

});
