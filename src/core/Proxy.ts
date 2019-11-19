
import { CoreEntity } from "./CoreEntity";


declare const $: any;


export class Proxy {
    public NAME: string;
    public address: string;
    protected static token: string;
    protected static tokenExpires: Date;





    constructor(proxyName:string, address: string) {
        this.NAME = proxyName;
        this.address = address;
    }



    protected setToken(tokenData: any): void {
        if ( ! tokenData ) {
            console.warn( "Invalid token data provided!" );
            return;
        }

        Proxy.token         = tokenData.token;
        Proxy.tokenExpires  = tokenData.expires;

    }



    protected httpRequest(method: string, endpoint: string, data?: any) {

        return $.ajax({
            method,
            url: this.address + endpoint,
            data
        });
    }

}
