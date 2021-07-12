import { PageComponent } from '../settings/appearance/pageComponent';

export interface Page {
    id: string;
    unPublished: boolean;
    link: string;
    title: string;
    keywords: string[];
    description: string;
    components: PageComponent[];
    configuration: {};
}