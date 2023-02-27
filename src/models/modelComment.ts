import { Reply } from "./modelReply";
import { User } from "./modelUser";

export class Comment{
    _id: string;
    user: User;
    message: string;
    date: string;
    replies:Reply[];

    constructor(
        _id: string,
        user: User,
        message: string,
        date: string,
        replies:Reply[]
    ){
        this._id = _id;
        this.user = user;
        this.message = message;
        this.date = date;
        this.replies = replies;
    }
}