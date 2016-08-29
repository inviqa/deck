var yosay = require('yosay');
var path = require('path');
var slug = require('transliteration').slugify

module.exports = function () {

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