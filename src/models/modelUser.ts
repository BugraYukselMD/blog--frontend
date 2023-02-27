export class User{
   _id?: string;
   name?: string;
   email?: string;
   imageUrl?: string;
   isAdmin?: Boolean; 
   favourites?:string[];

   constructor(
        _id?: string,
        name?: string,
        email?: string,
        imageUrl?: string,
        isAdmin?: Boolean,
        favourites?:string[]
   ){
      this._id = _id;
      this.name = name;
      this.email = email;
      this.imageUrl = imageUrl;
      this.isAdmin = isAdmin;
      this.favourites = favourites;
   }
}