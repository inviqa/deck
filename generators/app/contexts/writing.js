'use strict';

module.exports = function () {

  const templateVars = {
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
    this.destinationPath('assets'), {
      globOptions: {
        dot: true
      }
    }
  );

  // Copy the hook directories.
  this.fs.copy(
    this.templatePath('hooks'),
    this.destinationPath('hooks'), {
      globOptions: {
        dot: true
      }
    }
  );

  // Copy any default templates.
  this.fs.copy(
    this.templatePath('templates'),
    this.destinationPath('templates'), {
      globOptions: {
        dot: true
      }
    }
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

  // Copy the gitignore
  this.fs.copy(
    this.templatePath('gitignore'),
    this.destinationPath('.gitignore')
  )

  // Copy the TypeScript config
  this.fs.copy(
    this.templatePath('tsconfig.json'),
    this.destinationPath('tsconfig.json')
  )

}
