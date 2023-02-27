import { Injectable } from '@angular/core';

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

    success(message:string){
        alertify.notify(message, 'success', 3)
    }

    warning(message:string){
        alertify.notify(message, 'warning', 3)
    }

    error(message:string){
        alertify.notify(message, 'error', 3)
    }
}