'use strict';

const chalk = require('chalk');

module.exports = {
  node: function () {
    this.log(chalk.yellow('Installing NPM dependencies...'))
    this.npmInstall()
  }
}
