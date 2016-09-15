'use strict';

const yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({

  prompting: require('./contexts/prompting'),

  writing: require('./contexts/writing')

});
