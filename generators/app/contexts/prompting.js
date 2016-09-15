'use strict';

const yosay = require('yosay');
const path = require('path');
const slug = require('transliteration').slugify;
const titleize = require('titleize');

module.exports = function () {

  this.log(yosay(
    'Let me build you a fabulously empty Drupal 8 theme.'
  ));

  const prompts = [
    {
      type: 'input',
      name: 'themeName',
      message: 'Give your theme a human readable name',
      default: () => {
        const parentDir = path.basename(process.cwd());
        return titleize(parentDir);
      },
      store: true
    },
    {
      type: 'input',
      name: 'themeMachineName',
      message: 'Give your theme a machine name',
      default: answers => {
        return slug(answers.themeName, {
          separator: '_'
        });
      },
      store: true
    },
    {
      type: 'input',
      name: 'themeDescription',
      message: 'Describe your theme',
      default: answers => {
        return 'Default theme for ' + answers.themeName;
      },
      store: true
    },
    {
      type: 'list',
      name: 'baseTheme',
      message: () => {
        return 'Select a base theme';
      },
      choices: [
        'Stable',
        'Classy'
        ],
      default: 'Stable',
      filter: (response) => {
        return response.toLowerCase();
      },
      store: true
    },
    {
      type: 'confirm',
      name: 'bourbonNeat',
      message: 'Will you be using Bourbon and Neat?',
      default: true,
      store: true
    }
  ];

  // Capture the answers and store them on the generator instance.
  return this.prompt(prompts).then(function (props) {
    this.props = props;
  }.bind(this));

};
