


export class DateHelper {


    public static getParsedDate(dateISO: string): string {

        const date  = new Date( dateISO );
        const year  = date.getFullYear();
        const day   = date.getDate();
        const month = [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC"
        ][ date.getMonth() ];

        return `${ month } ${ day }, ${ year }`;
    }



    public static sortByDateProp(arr: any[], dateProp: string, descending?: boolean): any[] {
        let sorted = arr.sort((a: any, b: any) => {
            return new Date( a[ dateProp ] ).valueOf() - new Date( b[ dateProp ]).valueOf();
        });

        if ( descending ) {
            return sorted.reverse();
        } else {
            return sorted;
        }
    }
}