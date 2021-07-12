export interface MenuItem {
    title: string;
    link: string;
}

export interface MenuItemWithChildren extends MenuItem {
    children?: MenuItem[];
}

export interface ThemeSettings {
    headerMenu: MenuItemWithChildren[];
    footerMenu: MenuItem[];
    styleOverrides: { [key: string]: string; };
    additionalCss: string;
    heroTitle: string;
    heroLogo: string;
    heroSubTitle: string;
}