
declare const Promise: any;

export class OperationsHelper {


    /**
     * Validates the email address provided
     * @param {string} email address
     * @return {boolean} - is valid?
     */
    public static validateEmail(email: string): boolean {

        let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return regex.test( String(email).toLocaleLowerCase() );

    }



    /**
     * Sleep/Pause the process on a specific line for a period of time
     *
     * Usage (within async function):
     * example: await OperationsHelper.sleep( 1000 );
     *
     * @param {number} ms - milliseconds
     * @return {any}
     */
    public static sleep(ms: number): any {
        return new Promise( (resolve: any) => { setTimeout( resolve, ms ) } );
    }



    public static sortAlphanumericProp(arr: any[], prop: string, descending?: boolean): any[] {
        let sorted = arr.sort( (a: any, b: any) => {
            return a[ prop ].toLowerCase().localeCompare( b[ prop ].toLowerCase() );
        });

        if ( descending ) {
           return sorted.reverse();
        } else {
            return sorted;
        }
    }



    public static randomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * ( max - min + 1 ) + min );
    }

}
