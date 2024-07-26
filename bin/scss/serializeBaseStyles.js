const writeFile = require('./writeFile');

function serializeBaseStyles(config) {
    const fileData = `*,
    ::before,
    ::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    html,
    body {
        min-height: 100%;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    a {
        display: inline-block;
        text-decoration: none;
        color: inherit;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 0;
    }

    ul li,
    ol li {
        list-style: none;
    }

    button {
        border: none;
        background: none;
        cursor: pointer;
    }

    a {
        cursor: pointer;
    }

    input[type='number'] {
        appearance: textfield;
    }

    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button {
        margin: 0;
        appearance: none;
    }

    fieldset {
        padding: 0;
        border: none;
    }`;
    writeFile({ name: 'base', fileData, config });
}

module.exports = serializeBaseStyles;
