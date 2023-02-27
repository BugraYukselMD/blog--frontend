import { User } from "./modelUser";

export class Reply{
    _id: string;
    user: User;
    reply: string;
    date: string;

    constructor(
        _id: string,
        user: User,
        reply: string,
        date: string
    ){
        this._id = _id;
        this.user = user;
        this.reply = reply;
        this.date = date;
    }
}