///<reference path="../../../node_modules/@types/node/globals.d.ts"/>



import "../../style/index.scss";


const template = require( "../../templates/index.html" );



export class Index {

    constructor() {

        console.log( "CUSTOM SCRIPT LOADED" );

        if ( document.body.classList.contains( "authentication" ) ) {
            console.log( "aborting preload" );
            return;
        }


        this.mouseEnter = this.mouseEnter.bind( this );
        this.mouseLeave = this.mouseLeave.bind( this );
        this.mouseClick = this.mouseClick.bind( this );

        const container = document.createElement( "div" );

        container.innerHTML = template;

        document.body.appendChild( container );


        this.registerEventListeners();
    }



    private removeDisabled(): void {
        const disabled = document.getElementsByClassName( "disable-clicks" );

        for ( let i = 0; i < disabled.length; i++ ) {
            disabled[ i ].classList.remove( "disable-clicks" );
        }
    }



    private registerEventListeners(): void {
        window.addEventListener('mouseover', this.mouseEnter, false);

        window.addEventListener('mouseout', this.mouseLeave, false);

        document.addEventListener( "click", this.mouseClick, false );

    }



    private mouseClick(e: any): void {

        console.log( e.target );

        e.preventDefault();
        e.stopPropagation();

        return;

    }



    private mouseEnter(e: any): void {
        console.log( "MOUSE ENTER" );

        this.removeDisabled();

        /* if hovered node is NOT the registered
        || event listener...
        */
        if (e.target !== e.currentTarget) {
            // Reference hovered element
            let tgt = e.target;

            // tgt.classList.add('disable-clicks');
            tgt.classList.add('outline');

            // Stop the bubbling phase
            e.stopPropagation();
        }
    }



    private mouseLeave(e: any): void {

        if ( e.target !== e.currentTarget ) {
            let tgt = e.target;
            tgt.classList.remove('outline');
        }

        e.stopPropagation();
    }


}


new Index();