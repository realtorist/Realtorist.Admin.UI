import { CORPORATE_THEME } from './theme.corporate';
import { COSMIC_THEME } from './theme.cosmic';
import { DARK_THEME } from './theme.dark';
import { DEFAULT_THEME } from './theme.default';

export const Themes = [
    {
        value: DEFAULT_THEME.name,
        name: 'Light',
    },
    {
        value: DARK_THEME.name,
        name: 'Dark',
    },
    {
        value: COSMIC_THEME.name,
        name: 'Cosmic',
    },
    {
        value: CORPORATE_THEME.name,
        name: 'Corporate',
    },
];