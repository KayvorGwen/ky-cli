// output the template list
const path = require('path')
module.exports = () => {
    const tplObj = require(`${__dirname}/../templates`)
    console.log(JSON.stringify(tplObj, null, 4))
    process.exit(1)
}