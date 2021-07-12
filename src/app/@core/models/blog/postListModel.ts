import * as moment from "moment";

export interface PostListModel {
    id: string;
    link: string;
    title: string;
    subTitle: string;
    image: string;
    publishDate: moment.Moment;
    category: string;
    tags: string[];
    commentsCount: number;
    views: number;
}