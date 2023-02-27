import { Comment } from "./modelComment";

export class Blog{
    _id: string;
    title: string;
    readMin: number;
    coverImg: string;
    body: string;
    categories: string[];
    comments:Comment[];
    date: string;

    constructor(
        _id: string,
        title: string,
        readMin: number,
        coverImg: string,
        body: string,
        categories: string[],
        comments:Comment[],
        date: string
    ){
        this._id = _id;
        this.title = title;
        this.readMin = readMin;
        this.coverImg = coverImg;
        this.body = body;
        this.categories = categories;
        this.comments = comments;
        this.date = date
    }

}