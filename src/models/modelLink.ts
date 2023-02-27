export class Link{
    _id: string;
    linkName: string;
    linkImage: string;
    linkUrl: string;

    constructor(
        _id: string,
        linkName: string,
        linkImage: string,
        linkUrl: string
    ){
        this._id = _id;
        this.linkName = linkName;
        this.linkImage = linkImage;
        this.linkUrl = linkUrl;
    }
}