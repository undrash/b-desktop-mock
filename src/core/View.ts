

import {CoreEntity} from "./CoreEntity";
import {SnackBar} from "../common/snackbar/SnackBar";




export class View extends CoreEntity {
    protected snackbar: SnackBar;



    constructor(viewName: string) {
        super( viewName );

        this.snackbar = SnackBar._instance;
    }







}