///<reference path="../../../node_modules/@types/node/globals.d.ts"/>


import {ModalTypes} from "./ModalTypes";

declare const TweenLite: any;
declare const Power0: any;
declare const Back: any;


// CSS
import "../../style/modal.scss";


// HTML
const template = require( "../../templates/modal.html" );



export class Modal {
    private type: ModalTypes;

    private container: HTMLElement;

    private modalOverlay: HTMLElement;
    private modal: HTMLElement;
    private icon: HTMLElement;

    private closeBtn: HTMLElement;
    private title: HTMLElement;
    private description: HTMLElement;

    private submitBtn: HTMLElement;
    private dismissBtn: HTMLElement;

    private acknowledgements: HTMLElement;
    private acknowledgementError: HTMLElement;

    private submitCallback: Function;
    private dismissCallback: Function;



    constructor(type: ModalTypes, submitText: string, dismissText: string, title: string, description: string, acknowledgements?: string[], submitCallback?: Function, dismissCallback?: Function) {

        this.type                   = type;

        this.container              = document.createElement( "div" );
        this.container.id           = "modal-container";

        this.container.innerHTML    = template;
        document.body.appendChild( this.container );

        this.modalOverlay           = document.getElementById( "modal-overlay" );
        this.modal                  = document.getElementById( "modal" );
        this.icon                   = document.getElementById( "modal-icon" );

        this.closeBtn               = document.getElementById( "modal-close-btn" );
        this.title                  = document.getElementById( "modal-title" );
        this.description            = document.getElementById( "modal-description" );

        this.acknowledgements       = document.getElementById( "modal-acknowledgements-container" );
        this.acknowledgementError   = document.getElementById( "modal-acknowledgement-error" );

        this.submitBtn              = document.getElementById( "modal-submit-btn" );
        this.dismissBtn             = document.getElementById( "modal-dismiss-btn" );

        this.assignModalType( this.type );


        if ( this.type === ModalTypes.ACKNOWLEDGEMENT && ( ! acknowledgements || ! acknowledgements.length ) ) {
            throw new Error( "Modal type ACKNOWLEDGEMENT, requires acknowledgements to be provided." );
        }

        if ( this.type === ModalTypes.ACKNOWLEDGEMENT ) {
            this.populateAcknowledgements( acknowledgements );
        }


        this.submitBtn.innerText    = submitText;
        this.dismissBtn.innerText   = dismissText;

        this.title.innerText        = title;
        this.description.innerText  = description;

        if ( submitCallback ) this.submitCallback   = submitCallback;

        if ( dismissCallback ) this.dismissCallback = dismissCallback;

        this.submitListener         = this.submitListener.bind( this );
        this.dismissListener        = this.dismissListener.bind( this );
        this.documentKeyListener    = this.documentKeyListener.bind( this );
        this.modalClickListener     = this.modalClickListener.bind( this );

        this.enterScene();
    }



    private registerEventListeners(): void {
        this.submitBtn.addEventListener( "click", this.submitListener );
        this.dismissBtn.addEventListener( "click", this.dismissListener );
        this.closeBtn.addEventListener( "click", this.dismissListener );
        this.modalOverlay.addEventListener( "click", this.dismissListener );
        this.modal.addEventListener( "click", this.modalClickListener );
        document.addEventListener( "keydown", this.documentKeyListener );
    }



    private unregisterEventListeners(): void {
        this.submitBtn.removeEventListener( "click", this.submitListener );
        this.dismissBtn.removeEventListener( "click", this.dismissListener );
        this.closeBtn.removeEventListener( "click", this.dismissListener );
        this.modalOverlay.removeEventListener( "click", this.dismissListener );
        this.modal.removeEventListener( "click", this.modalClickListener );
        document.removeEventListener( "keydown", this.documentKeyListener );
    }



    private submitListener(): any {

        if ( this.type === ModalTypes.ACKNOWLEDGEMENT ) {

            const acknowledgements = document.getElementsByClassName( "acknowledgement-input" );

            for ( let i = 0; i < acknowledgements.length; i++ ) {
                if ( ! ( acknowledgements[i] as HTMLInputElement ).checked )
                    return this.acknowledgementError.style.display = "block";
            }
        }


        if ( this.submitCallback ) this.submitCallback();

        this.exitScene();
    }



    private dismissListener(): void {
        if ( this.dismissCallback ) this.dismissCallback();

        this.exitScene();
    }



    private documentKeyListener(e: any): void {
        const key = e.which || e.keyCode;

        if ( key === 27 ) this.dismissListener(); // ESCAPE

        if ( key === 13 ) this.submitListener(); // ENTER
    }



    private modalClickListener(e: any): void {
        e.stopPropagation();
    }



    private assignModalType(type: ModalTypes): void {

        switch ( type ) {

            case ModalTypes.INFO :

                break;

            case ModalTypes.ALERT :

                this.modal.classList.add( "alert" );
                this.submitBtn.classList.add( "alert-button" );

                break;

            case ModalTypes.ACKNOWLEDGEMENT :

                this.modal.classList.add( "acknowledgement" );
                this.submitBtn.classList.add( "alert-button" );

                break;

            default :
                break;

        }
    }



    private populateAcknowledgements(acknowledgements: string[]): void {

        for ( let i = 0; i < acknowledgements.length; i++ ) {

            const acknowledgement = document.createElement( "div" );

            acknowledgement.className = "checkbox-group";

            acknowledgement.innerHTML =`
                <input id="acknowledgement-${i}" class="acknowledgement-input" type="checkbox">
    
                <label for="acknowledgement-${i}" class="noselect pointer">${ acknowledgements[i] }</label>
            `;

            this.acknowledgements.appendChild( acknowledgement );
        }

    }



    private enterScene(): void {
        this.registerEventListeners();

        TweenLite.to( this.modalOverlay, 0.15, { opacity: 1 } );

        TweenLite.to( this.modal,
            0.3,
            {
                opacity: 1
            });


        TweenLite.to( this.modal,
            0.2,
            {
                marginTop: "20vh",
                opacity: 1
            });

    }



    private exitScene(): void {
        this.unregisterEventListeners();

        TweenLite.to( this.modalOverlay, 0.3, { opacity: 0 } );

        TweenLite.to( this.modal, 0.3, { opacity: 0 } );

        TweenLite.to( this.modal,
            0.2,
            {
                marginTop: "30vh",
                opacity: 0
            });

        setTimeout( () => {
            this.container.parentNode.removeChild( this.container );
        }, 300 );

    }



    public onSubmit(callback: Function): Modal {
        this.submitCallback = callback;
        return this;
    }



    public onDismiss(callback: Function): Modal {
        this.dismissCallback = callback;
        return this;
    }

}
