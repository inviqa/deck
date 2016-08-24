'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var slug = require('transliteration').slugify

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

  // Copy info file
  this.fs.copy(
    this.templatePath('theme.info.yml'),
    this.destinationPath(this.props.themeMachineName + '.info.yml')
  );

  // Copy theme file.
  this.fs.copy(
    this.templatePath('theme.theme'),
    this.destinationPath(this.props.themeMachineName + '.theme')
  );

  // Copy breakpoints file.
  this.fs.copy(
    this.templatePath('theme.breakpoints.yml'),
    this.destinationPath(this.props.themeMachineName + '.breakpoints.yml')
  );


}

module.exports = yeoman.Base.extend({

  prompting: prompting,

  writing: writing

});
//
// module.exports = yeoman.Base.extend({
//
//   writing: function () {
//     this.fs.copy(
//       this.templatePath('dummyfile.txt'),
//       this.destinationPath('dummyfile.txt')
//     );
//   },
//
//   install: function () {
//     this.installDependencies();
//   }
// });
