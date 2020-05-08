import React from 'react';
import { CSSObject } from '@emotion/core';
import {
    RadioItemTheme,
    RadioItemLabelThemeProperties,
    RadioItemLabelStateProperties,
    RadioItemCircleThemeProperties,
    RadioItemCircleStateProperties,
    RadioItemSizeProperties,
} from '../../types/Radio';
import baseTheme from '../../utils/baseTheme';

import { useRadio } from './useRadio';
import { FieldInputProps, FieldMetaProps, FieldHelperProps, FormikValues } from 'formik';
import scale from '../../utils/scale';
import typography from '../../utils/typography';
import useComponentTheme from '../../helpers/useComponentTheme';
import { ComponentStates, SVGRIcon, RequiredBy } from '../../types/Utils';
import { TypographyProperties } from '../../types/Typography';

export interface RadioItemProps extends React.HTMLProps<HTMLInputElement> {
    /** Radio group name (inner) */
    name?: string;
    /** Formik field object (inner) */
    field?: FieldInputProps<string>;
    /** Value of radio item */
    value: string;
    /** Formik meta object (inner) */
    meta?: FieldMetaProps<any>;
    /** Formik helpers object (inner) */
    helpers?: FieldHelperProps<string>;
    /** Values of Formik */
    values?: FormikValues;
    /** Custom icon for inner circle. */
    IconInner?: SVGRIcon;
    /** Custom icon for outer circle. */
    IconOuter?: SVGRIcon;
    /** RadioItem theme object for internal testing purposes. Uses in Storybook knobs to play with theme. */
    __theme?: RadioItemTheme;
    /** Additional CSS. */
    css?: CSSObject;
}

export const RadioItem = ({
    name,
    field,
    value,
    IconInner,
    IconOuter,
    children,
    __theme,
    css,
    ...props
}: RadioItemProps) => {
    const { orientation, alignment, size, labelRight, position, defaultValue } = useRadio();

    /* Get theme objects. */
    const { componentTheme, usedTheme } = useComponentTheme('RadioItem', __theme);
    const global = usedTheme.global || baseTheme.global;
    const { focus } = global.base || baseTheme.global.base;

    const radioItemTheme = componentTheme as RadioItemTheme;
    if (!radioItemTheme.sizes[size]) console.warn(`Specify "${size}" size. Default values are used instead`);

    /* Get theme for default state properties and merge them with default values for label. */
    const themeProperties = getThemeProperties(radioItemTheme, 'label', 'default');
    const sizeProperties = radioItemTheme.sizes[size];
    const themeDefaults = {
        borderWidth: themeProperties.border ? 1 : 0,
        borderStyle: 'solid',
        time: 200,
        easing: 'ease',
        color: baseTheme.colors.black,
        bg: 'transparent',
    };

    const tp: RequiredBy<RadioItemLabelThemeProperties, keyof typeof themeDefaults> = {
        ...themeDefaults,
        ...themeProperties,
    };

    /* Get theme for default state properties and merge them with default values for outer circle. */
    const themeOuterProperties = getThemeProperties(radioItemTheme, 'outer', 'default');
    const themeOuterDefault = {
        borderWidth: themeOuterProperties.border ? 1 : 0,
        borderStyle: 'solid',
        time: 200,
        easing: 'ease',
        transform: 'none',
    };

    const tOuterP: RequiredBy<RadioItemCircleThemeProperties, keyof typeof themeOuterDefault> = {
        ...themeOuterDefault,
        ...themeOuterProperties,
    };

    /* Get theme for default state properties and merge them with default values for inner circle. */
    const themeInnerProperties = getThemeProperties(radioItemTheme, 'inner', 'default');
    const themeInnerDefault = {
        borderWidth: themeInnerProperties.border ? 1 : 0,
        borderStyle: 'solid',
        color: baseTheme.colors.black,
        time: 200,
        easing: 'ease',
        transform: 'none',
    };

    const tInnerP: RequiredBy<RadioItemCircleThemeProperties, keyof typeof themeInnerDefault> = {
        ...themeInnerDefault,
        ...themeInnerProperties,
    };

    const sizeDefaults = {
        paddingVertical: 0,
        paddingHorizontal: 0,
        outerSize: scale(3),
        innerSize: scale(1),
        outerOffset: scale(1),
        horizontalGap: scale(3),
        verticalGap: scale(2),
    };
    const sp: RequiredBy<RadioItemSizeProperties, keyof typeof sizeDefaults> = {
        ...sizeDefaults,
        ...sizeProperties,
    };

    /* Define CSS rules from theme properties for default state. */
    const typographyName = sp.typography;
    const typographyCSS = typography(typographyName, usedTheme);

    const transition = getTransition(tp.time, tp.easing);
    const innerBorderRadius = tInnerP.borderRadius ? tInnerP.borderRadius : '50%';
    const outerBorderRadius = tOuterP.borderRadius ? tOuterP.borderRadius : '50%';

    const horizontalRule = labelRight ? 'left' : 'right';
    const verticalRule = position === 'side' ? (alignment !== 'bottom' ? 'top' : 'bottom') : position;

    const verticalOffset =
        sp.outerSize <=
        getLineHeight(typographyName ? usedTheme.typography?.styles[typographyName].desktop : undefined, sp).textHeight
            ? sp.paddingVertical
            : sp.paddingVertical >
              Math.ceil(
                  (sp.outerSize -
                      getLineHeight(
                          typographyName ? usedTheme.typography?.styles[typographyName].desktop : undefined,
                          sp,
                      ).textHeight) /
                      2,
              )
            ? sp.paddingVertical
            : Math.ceil(
                  (sp.outerSize -
                      getLineHeight(
                          typographyName ? usedTheme.typography?.styles[typographyName].desktop : undefined,
                          sp,
                      ).textHeight) /
                      2,
              );

    const topOuter =
        position === 'side'
            ? alignment !== 'center'
                ? (getLineHeight(typographyName ? usedTheme.typography?.styles[typographyName].desktop : undefined, sp)
                      .minLineHeight *
                      getLineHeight(
                          typographyName ? usedTheme.typography?.styles[typographyName].desktop : undefined,
                          sp,
                      ).textHeight +
                      (verticalOffset === sp.paddingVertical ? sp.paddingVertical : 0) -
                      sp.outerSize) /
                  2
                : `calc(50% - ${sp.outerSize / 2}px)`
            : verticalOffset;
    const topInner =
        position === 'side'
            ? alignment !== 'center'
                ? (getLineHeight(typographyName ? usedTheme.typography?.styles[typographyName].desktop : undefined, sp)
                      .minLineHeight *
                      getLineHeight(
                          typographyName ? usedTheme.typography?.styles[typographyName].desktop : undefined,
                          sp,
                      ).textHeight +
                      (verticalOffset === sp.paddingVertical ? sp.paddingVertical : 0) -
                      sp.outerSize) /
                      2 +
                  sp.outerSize / 2 -
                  sp.innerSize / 2
                : `calc(50% - ${sp.innerSize / 2}px)`
            : verticalOffset +
              (getLineHeight(typographyName ? usedTheme.typography?.styles[typographyName].desktop : undefined, sp)
                  .minLineHeight *
                  getLineHeight(typographyName ? usedTheme.typography?.styles[typographyName].desktop : undefined, sp)
                      .textHeight +
                  (verticalOffset === sp.paddingVertical ? sp.paddingVertical : 0) -
                  sp.outerSize) /
                  2 +
              sp.outerSize / 2 -
              sp.innerSize / 2;

    const defaultCSS: CSSObject = {
        position: 'relative',
        display: 'inline-block',
        borderWidth: tp.borderWidth,
        borderStyle: tp.borderStyle,
        borderRadius: tp.borderRadius,
        paddingTop: position === 'top' ? verticalOffset + sp.outerOffset + sp.outerSize : verticalOffset,
        paddingBottom: position === 'bottom' ? verticalOffset + sp.outerOffset + sp.outerSize : verticalOffset,
        paddingLeft:
            position === 'side'
                ? labelRight
                    ? sp.paddingHorizontal + sp.outerSize + sp.outerOffset
                    : sp.paddingHorizontal
                : sp.paddingHorizontal,
        paddingRight:
            position === 'side'
                ? !labelRight
                    ? sp.paddingHorizontal + sp.outerSize + sp.outerOffset
                    : sp.paddingHorizontal
                : sp.paddingHorizontal,
        ...typographyCSS,
        transition,
        ...getLabelStateCSS(tp),
        ...sp.css,
    };

    const defaultOuterCSS: CSSObject = {
        '&::before': {
            content: IconOuter ? 'none' : '""',
            position: 'absolute',
            width: sp.outerSize,
            height: sp.outerSize,
            borderWidth: tOuterP.borderWidth,
            borderStyle: tOuterP.borderStyle,
            borderRadius: outerBorderRadius,
            [verticalRule]: topOuter,
            [horizontalRule]: position === 'side' ? sp.paddingHorizontal : `calc(50% - ${sp.outerSize / 2}px)`,
            transition,
            ...getCircleStateCSS(tOuterP, false),
        },
    };

    const defaultInnerCSS: CSSObject = {
        '&::after': {
            content: IconInner ? 'none' : '""',
            position: 'absolute',
            width: sp.innerSize,
            height: sp.innerSize,
            borderWidth: tInnerP.borderWidth,
            borderStyle: tInnerP.borderStyle,
            borderRadius: innerBorderRadius,
            [verticalRule]: topInner,
            [horizontalRule]:
                position === 'side'
                    ? sp.paddingHorizontal + sp.outerSize / 2 - sp.innerSize / 2
                    : `calc(50% - ${sp.innerSize / 2}px)`,
            transition,
            ...getCircleStateCSS(tInnerP, false),
        },
    };

    /** Define CSS rules from theme properties for custom icons for default state */
    const defaultInnerIconCSS: CSSObject = {
        'input + label &': {
            position: 'absolute',
            width: sp.innerSize,
            height: sp.innerSize,
            [verticalRule]: topInner,
            [horizontalRule]: sp.outerSize / 2 - sp.innerSize / 2,
            transition,
            ...getCircleStateCSS(tInnerP, true),
        },
    };

    const defaultOuterIconCSS: CSSObject = {
        'input + label &': {
            position: 'absolute',
            width: sp.outerSize,
            height: sp.outerSize,
            [verticalRule]: topOuter,
            [horizontalRule]: 0,
            transition,
            ...getCircleStateCSS(tOuterP, true),
        },
    };

    /* Define CSS rules from theme properties for other states. */
    const themeHoverProperties = getThemeProperties(radioItemTheme, 'label', 'hover');
    const themeOuterHoverProperties = getThemeProperties(radioItemTheme, 'outer', 'hover');
    const themeInnerHoverProperties = getThemeProperties(radioItemTheme, 'inner', 'hover');

    const themeDisabledProperties = getThemeProperties(radioItemTheme, 'label', 'disabled');
    const themeOuterDisabledProperties = getThemeProperties(radioItemTheme, 'outer', 'disabled');
    const themeInnerDisabledProperties = getThemeProperties(radioItemTheme, 'inner', 'disabled');

    const themeFocusProperties = getThemeProperties(radioItemTheme, 'label', 'focus');
    const themeOuterFocusProperties = getThemeProperties(radioItemTheme, 'outer', 'focus');
    const themeInnerFocusProperties = getThemeProperties(radioItemTheme, 'inner', 'focus');

    const themeCheckedProperties = getThemeProperties(radioItemTheme, 'label', 'checked');
    const themeOuterCheckedProperties = getThemeProperties(radioItemTheme, 'outer', 'checked');
    const themeInnerCheckedProperties = getThemeProperties(radioItemTheme, 'inner', 'checked');

    const themeErrorProperties = getThemeProperties(radioItemTheme, 'label', 'error');
    const themeOuterErrorProperties = getThemeProperties(radioItemTheme, 'outer', 'error');

    const statesCSS: CSSObject = {
        ':hover': {
            ...getLabelStateCSS(themeHoverProperties),
            ...(tp.timeIn && {
                transition: getTransition(tp.timeIn, tp.easing),
            }),
            '&::before': {
                ...getCircleStateCSS(themeOuterHoverProperties, false),
            },
            '&::after': {
                ...getCircleStateCSS(themeInnerHoverProperties, false),
            },
        },
        '.js-focus-visible input:focus:not(.focus-visible) + &': {
            '&::before': {
                outline: 'none',
            },
        },
        'input:focus + &': {
            ...getLabelStateCSS(themeFocusProperties),
            '&::before': {
                outline: `${focus?.width || 2}px solid ${focus?.color || baseTheme.colors.black}`,
                outlineOffset: focus?.offset,
                ...focus?.css,
                ...getCircleStateCSS(themeOuterFocusProperties, false),
            },
            '&::after': {
                ...getCircleStateCSS(themeInnerFocusProperties, false),
            },
        },
        'input:checked + &': {
            ...getLabelStateCSS(themeCheckedProperties),
            '&:before': {
                ...getCircleStateCSS(themeOuterCheckedProperties, false),
            },
            '&:after': {
                ...getCircleStateCSS(themeInnerCheckedProperties, false),
            },
        },
        'input:disabled + &': {
            ...getLabelStateCSS(themeDisabledProperties),
            '&::before': {
                ...getCircleStateCSS(themeOuterDisabledProperties, false),
            },
            '&::after': {
                ...getCircleStateCSS(themeInnerDisabledProperties, false),
            },
        },
    };

    const statesInnerIconCSS: CSSObject = {
        'input + label:hover &': {
            ...getCircleStateCSS(themeInnerHoverProperties, true),
        },
        'input:focus + label &': {
            ...getCircleStateCSS(themeInnerFocusProperties, true),
        },
        'input:checked + label &': {
            ...getCircleStateCSS(themeInnerCheckedProperties, true),
        },
        'input:disabled + label &': {
            ...getCircleStateCSS(themeInnerDisabledProperties, true),
        },
    };

    const statesOuterIconCSS: CSSObject = {
        'input + label:hover &': {
            ...getCircleStateCSS(themeOuterHoverProperties, true),
        },
        'input:focus + label &': {
            outline: `${focus?.width || 2}px solid ${focus?.color || baseTheme.colors.black}`,
            outlineOffset: focus?.offset,
            ...focus?.css,
            ...getCircleStateCSS(themeOuterFocusProperties, true),
        },
        '.js-focus-visible input:focus:not(.focus-visible) + label &': {
            outline: 'none',
        },
        'input:checked + label &': {
            ...getCircleStateCSS(themeOuterCheckedProperties, true),
        },
        'input:disabled + label &': {
            ...getCircleStateCSS(themeOuterDisabledProperties, true),
        },
    };

    const errorCSS: CSSObject = {
        ...getLabelStateCSS(themeErrorProperties),
        'input + &': {
            '&:before': {
                ...getLabelStateCSS(themeOuterErrorProperties),
            },
        },
    };

    const styles = [
        defaultCSS,
        !IconOuter && defaultOuterCSS,
        !IconInner && defaultInnerCSS,
        statesCSS,
        props?.meta?.touched && props?.meta?.error && errorCSS,
        css,
    ];

    const innerIconStyles = [defaultInnerIconCSS, statesInnerIconCSS];
    const outerIconStyles = [defaultOuterIconCSS, statesOuterIconCSS];

    const inputStyles: CSSObject = {
        position: 'absolute',
        clip: 'rect(0, 0, 0, 0)',
    };

    const marginRule = `margin${orientation === 'vertical' ? 'Bottom' : 'Right'}`;
    const wrapperStyles: CSSObject = {
        display: orientation === 'vertical' ? 'block' : 'inline-block',
        verticalAlign: orientation === 'horizontal' ? 'top' : undefined,
        marginBottom: orientation === 'horizontal' ? sp.verticalGap : undefined,
        '&:not(:last-child)': {
            [marginRule]: orientation === 'vertical' ? sp.verticalGap : sp.horizontalGap,
        },
    };

    const id = `${name}-${value}`;
    const isChecked = props?.values ? props.values[name] === value : defaultValue === value;
    delete props.values;
    delete props.meta;
    delete props.helpers;
    delete props.errorPosition;

    return (
        <div css={wrapperStyles}>
            <input
                css={inputStyles}
                {...field}
                {...props}
                type="radio"
                name={name}
                id={id}
                value={value}
                defaultChecked={isChecked}
            />
            <label htmlFor={id} css={styles}>
                {IconOuter && <IconOuter css={outerIconStyles} />}
                {IconInner && <IconInner css={innerIconStyles} />}
                {children}
            </label>
        </div>
    );
};

const getLabelStateCSS = ({ color, bg, border, shadow, css }: RadioItemLabelStateProperties) => ({
    color,
    background: bg,
    borderColor: border,
    boxShadow: shadow,
    ...css,
});

const getCircleStateCSS = (
    { color, border, shadow, transform, css }: RadioItemCircleStateProperties,
    isIcon: boolean,
) => {
    const fillRule = color ? (isIcon ? 'fill' : 'background') : undefined;
    const borderRule = isIcon ? undefined : 'borderColor';
    const shadowRule = shadow ? (isIcon ? 'filter' : 'boxShadow') : undefined;
    const shadowValue = shadow ? (isIcon ? `drop-shadow(${shadow.replace('inset', '')})` : shadow) : undefined;

    return {
        [fillRule]: color,
        [borderRule]: border,
        [shadowRule]: shadowValue,
        transform,
        ...css,
    };
};

const getThemeProperties = (
    radioItemTheme: RadioItemTheme,
    component: 'label' | 'outer' | 'inner',
    state: ComponentStates | 'checked' | 'error' | 'success' | 'default',
):
    | RadioItemLabelThemeProperties
    | RadioItemLabelStateProperties
    | RadioItemCircleThemeProperties
    | RadioItemCircleStateProperties => {
    const themeProperties = radioItemTheme.theme[component][state];
    return { ...themeProperties };
};

const getTransition = (time: number, easing: string) =>
    ['color', 'fill', 'background-color', 'border-color', 'box-shadow', 'transform']
        .map((name) => `${name} ${easing} ${time}ms`)
        .join(', ');

const getLineHeight = (
    typographyProperties: TypographyProperties | undefined,
    sizeProperties: RadioItemSizeProperties,
) => {
    const cssRule = sizeProperties.css;
    let fontSize = 16;
    let lineHeight = 1.4;

    if (typographyProperties) {
        fontSize = parseFloat(typographyProperties.fontSize) * 16;
        lineHeight = typographyProperties.lineHeight;
    } else if (cssRule) {
        if (cssRule.fontSize) {
            if (typeof cssRule.fontSize === 'number') {
                fontSize = cssRule.fontSize;
            } else if (typeof cssRule.fontSize === 'string') {
                if (cssRule.fontSize.endsWith('rem')) {
                    fontSize = parseFloat(cssRule.fontSize) * 16;
                } else {
                    fontSize = parseFloat(cssRule.fontSize);
                }
            }
        }
        if (cssRule.lineHeight && typeof cssRule.lineHeight === 'number') lineHeight = cssRule.lineHeight;
    }

    const textHeight = Math.floor(fontSize * lineHeight);
    const minLineHeight = (sizeProperties.outerSize as number) / textHeight;

    return { textHeight, minLineHeight };
};

export default RadioItem;