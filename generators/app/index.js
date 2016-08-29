'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({

  prompting: require('./contexts/prompting'),

  writing: require('./contexts/writing'),

  install: require('./contexts/install')

});
