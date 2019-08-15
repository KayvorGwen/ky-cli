const chalk = require('chalk')
const ora = require('ora')
const inquirer = require('inquirer');
const download = require('download-git-repo')
const symbols = require("log-symbols");
const fs = require('fs');
const tplObj = require(`${__dirname}/../templates`)

// for example `vue init webpack project-name`
// the first param is webpack
// the last param is project name
module.exports = (tplName, projectName) => {
  // check the arguments
  if (!tplObj[tplName]) {
      console.log(chalk.red(`\n Template name does not exit! \n `))
      return
  }
  if (!projectName) {
      console.log(chalk.red('\n Project name should not be empty! \n '))
      return
  }

  // Check if the project name exists
  // if is not, download template
  if (!fs.existsSync(projectName)) {
    inquirer.prompt([
      {
        name: 'projectName',
        message: `project name (${projectName})`,
      },
      {
        name: 'description',
        message: 'Please enter the project description: '
    },
    {
        name: 'author',
        message: 'Please enter the author name: '
    }
    ]).then(answer => {
      const $projectName = answer.projectName || projectName
      url = tplObj[tplName]
      console.log(chalk.white('\n Start generating... \n'))
      // show the downloading icon 
      const spinner = ora("Downloading...");
      spinner.start();
      // execute download method and introduction arguments
      download (
        url,
        $projectName,
        err => {
          if (err) {
            spinner.fail();
            console.log(chalk.red(`Generation failed. ${err}`))
            return
          }
          // hide the downloading icon 
          spinner.succeed();
          const fileName = `${$projectName}/package.json`;
          if(fs.existsSync(fileName)){
              const data = fs.readFileSync(fileName).toString();
              let json = JSON.parse(data);
              json.name = $projectName;
              json.author = answer.author;
              json.description = answer.description;

              // from package.json update name、description、author
              fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
              console.log(symbols.success, `Generation completed!`)
              console.log('\n To get started')
              console.log(chalk.blue(`\n    cd ${$projectName} \n`))
              console.log(chalk.blue(`    npm install or yarn install \n`))
              process.exit(1)
          }
        }
      )
    })
  } else {
    console.log(symbols.error, chalk.red('The project already exists'));
  }
}