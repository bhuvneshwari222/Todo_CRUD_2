import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({
    providedIn: 'root'
})
export class TodosService{

    constructor(
        private _snackbar : MatSnackBar
    ){}
    
    uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    openSnackBarService(msg : string){
        this._snackbar.open(msg, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration : 2000
        })
    }
}