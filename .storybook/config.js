import React from 'react';
import { addParameters, configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import theme from './theme';
import 'focus-visible';
import '../src/styles';
import CenteredContainer from './components/CenteredContainer';

addParameters({
    options: {
        theme,
        showPanel: false,
    },
    viewport: {
        viewports: {
            appleIphoneSE: {
                name: 'Apple iPhone SE',
                styles: {
                    width: '320px',
                    height: '568px',
                },
            },
            mostAndroids: {
                name: 'Most Androids',
                styles: {
                    width: '360px',
                    height: '640px',
                },
            },
            appleIphone: {
                name: 'Apple iPhone 6-8',
                styles: {
                    width: '375px',
                    height: '667px',
                },
            },
            appleIphonePlus: {
                name: 'Apple iPhone 6-8 Plus',
                styles: {
                    width: '414px',
                    height: '736px',
                },
            },
            appleIpad: {
                name: 'Apple iPad',
                styles: {
                    width: '768px',
                    height: '1024px',
                },
            },
            laptops: {
                name: 'Laptops with 13 to 15"',
                styles: {
                    width: '1280px',
                    height: '800px',
                },
            },
            appleMacbook13: {
                name: 'Apple Macbook 13"',
                styles: {
                    width: '1366px',
                    height: '768px',
                },
            },
            appleMacbook15: {
                name: 'Apple Macbook 15"',
                styles: {
                    width: '1440px',
                    height: '900px',
                },
            },
            desktops: {
                name: 'Desktops in 14 to 19"',
                styles: {
                    width: '1600px',
                    height: '900px',
                },
            },
        },
    },
    backgrounds: [
        { name: 'White', value: '#fff' },
        { name: 'Black', value: '#000' },
        { name: 'Grey', value: '#ccc' },
    ],
});

addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(storyFn => <CenteredContainer>{storyFn()}</CenteredContainer>);

function loadStories() {
    return [
        require.context('./docs', false, /welcome\.stories\.mdx$/),
        require.context('./docs', false, /changelog\.stories\.mdx$/),
        require.context('./docs', false, /icons\.stories\.mdx$/),
        require.context('./docs', false, /colors\.stories\.mdx$/),
        require.context('../src/components', true, /\.stories\.(jsx?|tsx?|mdx)$/),
    ];
}

configure(loadStories(), module);