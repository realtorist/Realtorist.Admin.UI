export interface PageComponent {
    type: string,
    values: { [key: string]: any }
}

export enum PageComponentsTypes {
    FeaturedListings = 'FeaturedListings',
    CallToAction = 'CallToAction',
    Services = 'Services',
    TwoColumnsWithImage = 'TwoColumnsWithImage',
    TwoColumns = 'TwoColumns',
    OneColumn = 'OneColumn',
    Steps = 'Steps',
    HomeWorth = 'HomeWorth',
    Blog = 'Blog',
    Testimonials = 'Testimonials',
    ContactForm = 'ContactForm',
    ContactFormWithSidebar = 'ContactFormWithSidebar',
}

export enum PageComponentsTypesLabels {
    FeaturedListings = 'Featured listings',
    CallToAction = 'Call to action',
    Services = 'Services',
    TwoColumnsWithImage = 'Two columns with an image',
    TwoColumns = 'Two columns',
    OneColumn = 'One column',
    Steps = 'Steps',
    HomeWorth = 'What is my home worth',
    Blog = 'Blog',
    Testimonials = 'Testimonials',
    ContactForm = 'Contact form',
    ContactFormWithSidebar = 'Contact form with sidebar'
}