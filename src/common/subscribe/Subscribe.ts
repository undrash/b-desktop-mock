
import {MailChimpInterest} from "../../connection/constants/MailChimpInterest";
import {SubscribeModel} from "../../connection/models/SubscribeModel";
import {ValidationHelper} from "../../helpers/ValidationHelper";
import {CoreEntity} from "../../core/CoreEntity";
import {Page} from "../../core/Page";


import "../../style/subscribe.scss";

const template = require( "../../templates/subscribe.html" );



export class Subscribe extends CoreEntity {
    private page: Page;

    private contentContainer: HTMLElement;
    private feedbackSuccess: HTMLElement;
    private feedbackError: HTMLElement;

    private subscribe: HTMLElement;
    private subscribeCloseBtn: HTMLElement;
    private subscribeOverlay: HTMLElement;

    private firstName: HTMLInputElement;
    private lastName: HTMLInputElement;
    private email: HTMLInputElement;

    private firstNameError: HTMLElement;
    private lastNameError: HTMLElement;
    private emailError: HTMLElement;

    private subscribeBtn: HTMLElement;

    private interest: MailChimpInterest;

    constructor(page: Page) {

        super( "Subscribe" );

        document.getElementById( "main-container" ).innerHTML += template;

        this.page                   = page;

        this.contentContainer       = document.getElementById( "subscribe-content-container" );
        this.feedbackSuccess        = document.getElementById( "subscribe-feedback-success" );
        this.feedbackError          = document.getElementById( "subscribe-feedback-error" );


        this.subscribe              = document.getElementById( "subscribe-section" );
        this.subscribeCloseBtn      = document.getElementById( "close-subscribe-btn" );
        this.subscribeOverlay       = document.getElementById( "subscribe-panel-overlay" );

        this.firstName              = document.getElementById( "subscribe-first-name-input" ) as HTMLInputElement;
        this.lastName               = document.getElementById( "subscribe-last-name-input" ) as HTMLInputElement;
        this.email                  = document.getElementById( "subscribe-email-input" ) as HTMLInputElement;

        this.firstNameError         = document.getElementById( "subscribe-first-name-input-error" );
        this.lastNameError          = document.getElementById( "subscribe-last-name-input-error" );
        this.emailError             = document.getElementById( "subscribe-email-input-error" );

        this.subscribeBtn           = document.getElementById( "subscribe-btn" );


        this.interest               = MailChimpInterest.FREE;

        this.subscribeBtnListener   = this.subscribeBtnListener.bind( this );
        this.hideSubscribe          = this.hideSubscribe.bind( this );
        this.showSubscribe          = this.showSubscribe.bind( this );

        this.registerEventListeners();
    }



    private registerEventListeners(): void {

        this.registerSubscribeTriggers();

        this.subscribeCloseBtn.addEventListener("click", () => this.hideSubscribe() );

        document.addEventListener( "keydown", (e: any) => {
            const key = e.which || e.keyCode;

            if ( key === 27 ) this.hideSubscribe(); // ESCAPE
        });

        this.subscribeOverlay.addEventListener( "click", () => this.hideSubscribe() );

        this.firstName.addEventListener( "keyup", () => this.validateInputs() );
        this.lastName.addEventListener( "keyup", () => this.validateInputs() );
        this.email.addEventListener( "keyup", () => this.validateInputs() );

        this.firstName.addEventListener( "focus", () => this.firstNameError.style.display = "none" );
        this.lastName.addEventListener( "focus", () => this.lastNameError.style.display = "none" );
        this.email.addEventListener( "focus", () => this.emailError.style.display = "none" );

        this.subscribeBtn.addEventListener( "click", this.subscribeBtnListener );
    }



    private registerSubscribeTriggers(): void {

        const subscribeBtns = document.getElementsByClassName( "subscribe-trigger" );

        for ( let i = 0; i < subscribeBtns.length; i++ ) {
            subscribeBtns[i].addEventListener( "click", this.showSubscribe );
        }
    }



    private subscribeBtnListener(): void {

        if ( ! this.subscribeBtn.classList.contains( "active" ) ) return this.displayFormErrors();


        const subscribeModel = new SubscribeModel(
            this.firstName.value,
            this.lastName.value,
            this.email.value,
            this.interest
        );


        this.connection.subscribe( subscribeModel )
            .done( (response: any) => {
                console.log( response );
                this.contentContainer.style.display = "none";

                if ( ! response.success ) this.feedbackSuccess.classList.add( "already-subscribed" );

                this.feedbackSuccess.style.display = "block";

                this.resetSubscribeForm();
            })
            .fail( (err: Error) => {
                console.log( err );
                this.contentContainer.style.display = "none";
                this.feedbackError.style.display = "block";
            });

    }



    private hideSubscribe(): void {
        this.subscribe.classList.remove( "enter" );
        this.subscribeOverlay.style.display = "none";

        this.feedbackSuccess.classList.remove( "already-subscribed" );

        this.feedbackSuccess.style.display      = "none";
        this.feedbackError.style.display        = "none";
        this.contentContainer.style.display     = "block";

        if ( ! this.validateInputs() ) this.subscribeBtn.classList.remove( "active" );

    }



    private showSubscribe(e: any): void {

        if ( e.target.classList.contains( "paid" ) ) {
            this.interest = MailChimpInterest.PAID;
        } else if ( e.target.classList.contains( "enterprise" ) ) {
            this.interest = MailChimpInterest.ENTERPRISE;
        } else {
            this.interest = MailChimpInterest.FREE;
        }

        this.subscribe.classList.add("enter");
        this.subscribeOverlay.style.display = "block";
    }



    private resetSubscribeForm(): void {
        this.firstName.value    = null;
        this.lastName.value     = null;
        this.email.value        = null;

        this.firstNameError.style.display   = "none";
        this.lastNameError.style.display    = "none";
        this.emailError.style.display       = "none";
    }



    private validateInputs(): boolean {

        let valid = true;

        if ( this.firstName.value.length > 1 &&
             this.lastName.value.length > 1 &&
             ValidationHelper.validateEmail( this.email.value ) ) {

            this.subscribeBtn.classList.add( "active" );
        } else {
            this.subscribeBtn.classList.remove( "active" );
            valid = false;
        }

        return valid;
    }



    private displayFormErrors(): void {

        if ( this.firstName.value.length < 2 ) this.firstNameError.style.display = "block";
        if ( this.lastName.value.length < 2 ) this.lastNameError.style.display = "block";
        if ( ! ValidationHelper.validateEmail( this.email.value ) ) this.emailError.style.display = "block";
    }

}
