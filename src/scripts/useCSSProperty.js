import useTheme from './useTheme';
import isObject from './isObject';
import toArray from './toArray';

// TODO Убрать отсюда NAMES
const NAMES = ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];

const useCSSProperty = ({ name, value, defaultProperty, condition, transform }) => {
    const { layout } = useTheme();

    let arr = toArray(value);

    if (arr.some(value => value === undefined) && defaultProperty) {
        arr = arr.map((value, index) => {
            if (value !== undefined) return value;
            if (!Array.isArray(defaultProperty)) return !index ? layout[defaultProperty] : value;
            return defaultProperty[index] ? layout[defaultProperty[index]] : value;
        });
    }

    if (arr.every(value => value === undefined)) return;
    if (condition !== undefined && !condition) return;

    const obj = arr.find(value => isObject(value));
    if (!obj) return setValue(name, arr, transform);

    return Object.keys(obj)
        .sort((a, b) => NAMES.indexOf(b) - NAMES.indexOf(a))
        .reduce((acc, bp) => {
            const nameIndex = NAMES.indexOf(bp);
            const nextBp = nameIndex !== -1 && NAMES[nameIndex + 1];
            const values = arr.map(value => (!isObject(value) ? value : value[bp]));
            const rule = setValue(name, values, transform);
            return {
                ...acc,
                ...(nextBp ? { [`@media (max-width: ${layout.breakpoints[nextBp] - 1}px)`]: rule } : rule),
            };
        }, {});
};

const setValue = (name, value, transform) => {
    if (value.length === 1) value = value[0];

    return {
        [name]: transform ? transform(value) : value,
    };
};

export default useCSSProperty;