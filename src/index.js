const program = require('commander')
const chalk = require('chalk')
const { delCMD, getCMD } = require('../utils/cmd')

// define the current version
// define usage method
program
  .version(require('../package').version)
  .usage('<command> [options]')

  // {/* .command('add', 'add a new template') */}
program
  .command('add')
  .description('You can add templates that you like')
  .action(() => {
    require('../command/add')()
  })

program
  .command('delete')
  .description('delete a template')
  .action(() => {
    require('../command/delete')()
  })

program
  .command('list')
  .description('list all the templates')
  .action(() => {
    require('../command/list')()
  })

program
  .command('init <template-name> [project-name]')
  .description('Generate a new project from a template')
  .action((tplName, projectName) => {
    require('../command/init')(tplName, projectName)
  })
  
// output help information on unknown commands
program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp(outputMessage)
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
    if (!program.commands.includes(cmd)) {
      process.exit(1)
    }
  })

// add some useful info on help
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`ky <command> --help`)} for detailed usage of given command.`)
  console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))

// parse command line arguments
program.parse(process.argv)

// when ky command not arguments
if (!program.args.slice(2).length) {
    if (!getCMD()) {
      program.outputHelp()
      delCMD()
    }
}

function outputMessage(msg) {
  return chalk.yellow(`\n${msg}`)
}

// if (!program.args.length) program.help();