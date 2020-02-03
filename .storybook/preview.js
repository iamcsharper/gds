import { addParameters, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import themeDecorator from './decorators/themeDecorator';
import baseTheme from '../src/scripts/baseTheme';

addParameters({
    viewport: { viewports: INITIAL_VIEWPORTS },
    backgrounds: Object.entries(baseTheme.colors).map(([name, value]) => ({ name, value })),
});

addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(themeDecorator);
