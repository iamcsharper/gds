const fs = require('fs');
const path = require('path');
const axios = require('./axios');
const getPalettes = require('./getPalettes');
const getColors = require('./getColors');

let outputDir = '../public';
if (process.argv.includes('-o')) outputDir = process.argv[process.argv.indexOf('-o') + 1];

const getters = {
    palettes: getPalettes,
    colors: getColors,
};

async function getTokens(types) {
    const response = await axios();
    const figmaTree = response.data;

    const getToken = type => {
        let token = {};

        if (!types || types.includes(type)) {
            try {
                token = getters[type](figmaTree);
                console.log(`✅  ${type[0].toUpperCase()}${type.slice(1)}`);
            } catch (error) {
                console.log(`❌  ${type[0].toUpperCase()}${type.slice(1)}`);
            }
        }

        return token;
    };

    const palettes = getToken('palettes');
    const colors = getToken('colors');

    fs.writeFile(path.resolve(__dirname, `${outputDir}/tokens.json`), JSON.stringify({ palettes, colors }), err => {
        if (err) throw err;
        console.log('Tokens are ready to use!');
    });
}

module.exports = getTokens;
