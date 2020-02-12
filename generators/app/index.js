const Generator = require('yeoman-generator');
const path = require('path');
const glob = require('glob');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname
      }
    ]).then(answers => {
      this.answers = answers;
    });
  }
  writing() {
    const templates = glob.sync('**/**', {
      cwd: path.join(__dirname, 'templates'),
      dot: true
    });

    templates.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      );
    });
  }
};
