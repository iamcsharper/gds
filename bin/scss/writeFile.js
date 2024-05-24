const fs = require('fs');
const { resolve } = require('path');
const { red, green } = require('chalk');
const prettier = require('prettier');

async function sdf({ name, fileData, config }) {
    const fullScssDir = resolve(config.scssDir);
    await fs.promises.mkdir(fullScssDir, { recursive: true });

    try {
        await fs.promises.writeFile(
            `${fullScssDir}/${name}.module.scss`,
            prettier.format(fileData, { printWidth: 120, singleQuote: true, tabWidth: 4, parser: 'scss' }),
        );
        console.log(green(`${name} are ready to use: ${config.tokensDir}/${name}.module.scss`));
    } catch (err) {
        console.error(red(err.message));
        console.log(red(`Cannot write file: ${fullScssDir}/${name}.module.scss`));
        process.exit(1);
    }
}

module.exports = sdf;