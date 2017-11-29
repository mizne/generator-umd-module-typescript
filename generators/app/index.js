const Generator = require('yeoman-generator')
const yosay = require('yosay')
const chalk = require('chalk')
const underscoreString = require('underscore.string')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }

  initializing() {
    this.log(yosay(`Welcome to the ${chalk.red('UMD Module For TS')} generator!`))
  }
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'authorName',
        message: 'Your full name:',
        validate: function(input) {
          if (/.+/.test(input)) {
            return true
          }
          return 'Please enter your full name'
        },
        default: this.user.git.name
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Your email address:',
        validate: function(input) {
          if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
            return true
          }
          return 'Please enter a valid email address'
        },
        default: this.user.git.email
      },
      {
        type: 'input',
        name: 'gitRepositoryUrl',
        message: 'Git repository url',
        default: () => {
          return `https://github.com/${this.user.git.name()}/${underscoreString.slugify(this.appname)}`
        }
      },
      {
        type: 'input',
        name: 'libraryName',
        message: 'Your library name (kebab-case)',
        default: underscoreString.slugify(this.appname),
        filter: function(x) {
          return underscoreString.slugify(x)
        }
      }
    ]

    return this.prompt(prompts).then(props => {
      this.props = {
        author: {
          name: props.authorName,
          email: props.authorEmail
        },
        libraryName: {
          original: props.libraryName,
          kebabCase: props.libraryName,
          umd: underscoreString.camelize(props.libraryName)
        },
        gitRepositoryUrl: props.gitRepositoryUrl
      }
    })
  }

  writing() {
    this.log(JSON.stringify(this.props, null, 2))
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        props: this.props
      }
    )

    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    )

    this.fs.copyTpl(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    )

    this.fs.copyTpl(
      this.templatePath('README.MD'),
      this.destinationPath('README.MD'),
      {
        props: this.props
      }
    )

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {
        props: this.props
      }
    )

    // Copy src folder
    this.fs.copy(this.templatePath('src/**/*.ts'), this.destinationPath('src'))
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: true
    })
  }
}
