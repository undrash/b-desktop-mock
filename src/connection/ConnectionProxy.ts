
import {CreateEditProjectModel} from "./models/CreateEditProjectModel";
import {SearchProjectsModel} from "./models/SearchProjectsModel";
import {CreateEditFlowModel} from "./models/CreateEditFlowModel";
import {CreateInquiryModel} from "./models/CreateInquiryModel";
import {CreateGuideModel} from "./models/CreateGuideModel";
import {SortGuideModel} from "./models/SortGuideModel";
import {SubscribeModel} from "./models/SubscribeModel";
import {SortFlowModel} from "./models/SortFlowModel";
import {Proxy} from "../core/Proxy";



declare const $: any;



export class ConnectionProxy extends Proxy {

    constructor(proxyName: string) {
        let address = `${ location.protocol }//${ location.hostname }${ location.port ? ':' + location.port: '' }`;
        super( proxyName, address );
    }



    public static getAddress(): string {
        return `${ location.protocol }//${ location.hostname }${ location.port ? ':' + location.port: '' }`;
    }



    public subscribe(data: SubscribeModel) {

        return this.httpRequest(
            "POST",
            "/subscriptions/subscribe",
            data
        );
    }



    public createInquiry(data: CreateInquiryModel) {

        return this.httpRequest(
            "POST",
            "/api/v1/contact",
            data
        );
    }



    public getProjects() {

        return this.httpRequest(
            "GET",
            "/api/v1/projects"
        );
    }



    public createProject(data: CreateEditProjectModel) {

        return this.httpRequest(
            "POST",
            "/api/v1/projects",
            data
        );
    }



    public editProject(data: CreateEditProjectModel) {

        return this.httpRequest(
            "PUT",
            "/api/v1/projects",
            data
        );
    }



    public deleteProject(id: string) {

        return this.httpRequest(
            "DELETE",
            `/api/v1/projects/${ id }`
        );
    }



    public searchProjects(data: SearchProjectsModel) {

        return this.httpRequest(
            "POST",
            "/api/v1/projects/search",
            data
        );
    }



    public getCurrentUser() {

        return this.httpRequest(
            "GET",
            "/api/v1/users/current"
        );
    }



    public getGuidesOfFlow(id: string) {

        return this.httpRequest(
            "GET",
            `/api/v1/flows/guides/${ id }`
        );
    }



    public createFlow(data: CreateEditFlowModel) {

        return this.httpRequest(
            "POST",
            "/api/v1/flows",
            data
        );
    }



    public duplicateFlow(id: string) {

        return this.httpRequest(
            "POST",
            `/api/v1/flows/duplicate/${ id }`
        );
    }



    public editFlow(data: CreateEditFlowModel) {

        return this.httpRequest(
            "PUT",
            "/api/v1/flows",
            data
        );
    }



    public deleteFlow(id: string) {

        return this.httpRequest(
            "DELETE",
            `/api/v1/flows/${ id }`
        );
    }



    public sortFlow(data: SortFlowModel) {

        return this.httpRequest(
            "PUT",
            "/api/v1/flows/sort",
            data
        );
    }



    public publishFlow(id: string) {

        return this.httpRequest(
            "PUT",
            `/api/v1/flows/publish/${ id }`
        );
    }



    public createGuide(data: CreateGuideModel) {

        return this.httpRequest(
            "POST",
            "/api/v1/guides",
            data
        );
    }



    public getGuide(id: string) {

        return this.httpRequest(
            "GET",
            `/api/v1/guides/${ id }`
        );
    }



    public updateGuide(id: string, data: any) {

        return this.httpRequest(
            "PUT",
            `/api/v1/guides/update/${ id }`,
            data
        );
    }



    public uploadGuideImage(id: string, image: FormData, success: Function, failure: Function) {


        const xhr = new XMLHttpRequest();

        xhr.open( 'POST', `/api/v1/guides/upload/image/${ id }`, true );
        xhr.onload = () => {

            let response: any;

            try {
                response = JSON.parse( xhr.responseText );
            } catch (err) {}


            if ( xhr.status == 200 ) {

                if ( success ) success( response );

            } else {

                if ( failure && response ) failure( response );
                if ( failure && ! response ) failure( xhr.responseText );

            }
        };
        xhr.send( image );
    }



    public deleteGuide(id: string) {

        return this.httpRequest(
            "DELETE",
            `/api/v1/guides/${ id }`
        );
    }



    public sortGuide(data: SortGuideModel) {

        return this.httpRequest(
            "PUT",
            "/api/v1/guides/sort",
            data
        );
    }



    public duplicateGuide(id: string) {

        return this.httpRequest(
            "POST",
            `/api/v1/guides/duplicate/${ id }`
        )
    }



    public createImage(base64: string) {

        return this.httpRequest(
            "POST",
            "/api/v1/images/",
            { data: base64 }
        )
    }



    public removeGuideImage(id: string) {

        return this.httpRequest(
            "DELETE",
            `/api/v1/images/${ id }`
        );
    }



    public getThemes() {

        return this.httpRequest(
            "GET",
            "/api/v1/themes"
        )
    }



    public dismissCookieNotification() {

        return this.httpRequest(
            "GET",
            "/api/v1/cookies/dismiss"
        );
    }
}
