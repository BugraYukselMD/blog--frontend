export class Category{
    _id: string;
    categoryName: string;

    constructor(
        _id: string,
        categoryName: string
    ){
        this._id = _id;
        this.categoryName = categoryName;
    }
}