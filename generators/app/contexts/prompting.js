'use strict';

const yosay = require('yosay');
const path = require('path');
const slug = require('transliteration').slugify
const titleize = require('titleize');

module.exports = function () {

  this.log(yosay(
    'Let me build you a fabulously empty Drupal 8 theme.'
  ));

  const prompts = [
    {
      'type': 'input',
      'name': 'themeName',
      'message': 'Give your theme a human readable name',
      'default': () => {
        const parentDir = process.cwd().split(path.sep).pop();
        return titleize(parentDir);
      }
    },
    {
      'type': 'input',
      'name': 'themeMachineName',
      'message': 'Give your theme a machine name',
      'default': answers => {
        return slug(answers.themeName, {
          separator: '_'
        });
      }
    },
    {
      'type': 'input',
      'name': 'themeDescription',
      'message': 'Describe your theme',
      'default': answers => {
        return 'Default theme for ' + answers.themeName;
      }
    },
    {
      'type': 'list',
      'name': 'baseTheme',
      'message': 'Select a base theme',
      'choices': ['Stable', 'Classy'],
      'default': 'Stable',
      'filter': (response) => {
        return response.toLowerCase();
      }
    }
    ];

  // Capture the answers and store them on the generator instance.
  return this.prompt(prompts).then(function (props) {
    this.props = props
  }.bind(this));

}
