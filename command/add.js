const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const tpl = require(`${__dirname}/../templates`)
const { isCMD } = require('../utils/cmd')

module.exports = () => {
    isCMD(true)
    let question = [
      {
        name: "name",
        type: 'input',
        message: "Please enter your template name:",
        validate (val) {
          if (val === '') {
            return 'The template name is not empty'
          } else if (tpl[val]) {
            return 'The template name already exists'
          } else {
            return true
          }
        }
      },
      {
        name: "url",
        type: 'input',
        message: "Please enter your template address:",
        validate (val) {
          if (val === '') return 'The template address is not empty'
          return true
        }
      }
    ]
    
    inquirer
      .prompt(question).then(answers => {
        // answers is user input content, the answers type is Object
        let { name, url } = answers;
        // filter unicode
        tpl[name] = url.replace(/[\u0000-\u0019]/g, '')
        fs.writeFile(`${__dirname}/../templates.json`, JSON.stringify(tpl), 'utf-8', err => {
          if (err) console.log(err)
          console.log('\n')
          console.log(chalk.green('Add template successfully!\n'))
          console.log(chalk.grey('The latest templalte list is: \n'))
          console.log(tpl)
          console.log('\n')
        })
    })
}
