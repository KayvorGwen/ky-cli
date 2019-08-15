/**
 * the methos is change ky
 * @param {boolean} bol the params to change Ky
 */
const isCMD = (bol) => {
    process.env.Ky = bol ? bol : false;
}


const delCMD = () => {
    delete(process.env.Ky);
}

const getCMD = () => {
    return process.env.Ky;
}

module.exports = {
    isCMD,
    delCMD,
    getCMD
}