# GDS

**GDS** is a design system in [Greensight](https://greensight.pro/) company.

⚠️ This system is supposed to be used only inside our company, at least for now.

⚠️⚠️ GDS is in early development stage, so probably everything is broken.

⚠️⚠️⚠️ We're not looking for outsource contributors at the moment.

## Install

```bash
yarn add @greensight/gds
```

## Tokens

GDS provides `gds-tokens` script, which fetches design tokens from Figma:

```bash
gds-tokens
```

`gds-tokens` options:

1. **-c** - path to config file (`gds.config.js` by default)

To use tokens you need to create Figma file in proper template and provide `gds.config.js` file with at least `figmaToken` and `figmaId` properties:

| Property          | Description                                                               | Default                                        |
| ----------------- | --------------------------------------------------------------------------|------------------------------------------------|
| `figmaToken`      | Personal Figma token: https://www.figma.com/developers/api#authentication | -                                              |
| `figmaId`         | Id of figma file: https://www.figma.com/file/figmaId/project-name         | -                                              |
| `tokensDir`       | Directory for `tokens.json` file                                          | 'public'                                       |
| `iconsDir`        | Directory for saved icons                                                 | 'src/client/images/icons/tokens'               |
| `tokens`          | Array of token types to fetch                                             | ['palettes', 'colors', 'typography', 'icons']  |
| `page`            | Name of page with tokens                                                  | 'Storybook'                                    |
| `frames`          | Object with frame names for different token types                         | 'Palettes', 'Colors', 'Typography', 'Icons'    |

## Theme

GDS uses `Emotion` inside. You need provide theme object to make it works.
Use ThemeProvider for that purpose.

To see default theming you can use provided by GDS `baseTheme`:

```js
import { ThemeProvider, baseTheme } from '@greensight/gds';

hydrate(
    <ThemeProvider theme={baseTheme}>
        <App />
    </ThemeProvider>
    document.querySelector('#root'),
);
```

For your own theming create theme object with `createTheme` utility:

```js
import { createTheme } from '@greensight/gds';
import tokens from '../../../public/tokens';

const theme = createTheme({
    tokens,
    theme: {
        // personal settings
    },
});

export default theme;
```

And provide theme in the same way:

```js
import { ThemeProvider } from '@greensight/gds';
import theme from './scripts/theme';

hydrate(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
    document.querySelector('#root'),
);
```

ThemeProvider is doing 2 things:

1. gives theme context to all GDS components
1. gives you theme object with all style vars

To use theme inside your components GDS provides `useTheme` hook:

```js
import { useTheme } from '@greensight/gds';

const SomeComponent = () => {
    const theme = useTheme();
    return (
        <button type="button" css={{ backgroundColor: theme.colors.bg.brand }}>
            Button
        </button>
    );
};
```

## Components

**⚠️ Components are currently under development**

GDS provides collection of components:

```js
import { Button } from '@greensight/gds';

const MyComponent = () => {
    return (
        <div>
            <h1>Some title</h1>
            <Button>Click me</Button>
        </div>
    );
};
```

## Storybook

GDS provides Storybook components to integrate in your docs:

1. Palettes
1. Colors
1. Typography

You can use it in your mdx Storybook files:

```mdx
import { Meta } from '@storybook/addon-docs/blocks';
import { Storybook } from '@greensight/gds';
import theme from '../../src/client/scripts/theme';

<Meta title="Docs | Typography" />

# Typography

<Storybook.Typography theme={theme} />
```

## Development

| `yarn <command>`  | Description                                     |
| ----------------- | ----------------------------------------------- |
| `build`           | Build package                                   |
| `storybook`       | Starts a Storybook in dev mode                  |
| `storybook:build` | Build static Storybook version in `docs` folder |
| `storybook:serve` | Starts a static server for `docs` browsing      |
| `tokens`          | Fetch design tokens from Figma                  |
| `eslint`          | Lint all `.js`, `.jsx`, `.ts` and `.tsx` files  |
| `stylelint`       | Lint all `.css` files                           |
