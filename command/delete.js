const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const tplObj = require(`${__dirname}/../templates`)
const { isCMD } = require('../utils/cmd')

module.exports = () => {
  isCMD(true)
  let question = [
    {
      name: "name",
      message: "Please enter the name of the template to delete:",
      validate (val) {
        if (val === '') {
          return 'Name is required!'
        } else if (!tplObj[val]) {
          return 'Template does not exist!'
        } else  {
          return true
        }
      }
    }
  ]
  
  inquirer
    .prompt(question).then(answers => {
      let { name } = answers;
      delete tplObj[name]
      // update template.json
      fs.writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplObj), 'utf-8', err => {
        if (err) console.log(err)
        console.log('\n')
        console.log(chalk.green('Deleted successfully!\n'))
        console.log(chalk.grey('The latest template list is: \n'))
        console.log(tplObj)
        console.log('\n')
      })
  })
}
