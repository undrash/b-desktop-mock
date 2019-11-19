///<reference path="../../../node_modules/@types/node/globals.d.ts"/>



import "../../style/guides.scss";
import "../../style/index.scss";


const template = require( "../../templates/index.html" );

import unique from "unique-selector";
import {Guide} from "../../guide/Guide";


export class Index {

    private selectBtn: HTMLElement;
    private targetSelector: HTMLElement;

    private guide: Guide;

    constructor() {

        console.log( "CUSTOM SCRIPT LOADED" );

        if ( document.body.classList.contains( "authentication" ) ) {
            console.log( "aborting preload" );
            return;
        }

        const container = document.createElement( "div" );

        container.innerHTML = template;

        document.body.appendChild( container );

        this.selectBtn          = document.getElementById( "boardme-select-element" );
        this.targetSelector     = document.getElementById( "boardme-element-selector" );

        this.mouseEnter = this.mouseEnter.bind( this );
        this.mouseLeave = this.mouseLeave.bind( this );
        this.mouseClick = this.mouseClick.bind( this );

        this.registerEventListeners();
    }



    private registerEventListeners(): void {

        this.selectBtn.addEventListener( "click", () => {

            if ( this.selectBtn.classList.contains( "selected" ) ) {

                window.removeEventListener('mouseover', this.mouseEnter, false );

                window.removeEventListener('mouseout', this.mouseLeave, false );

                document.removeEventListener( "click", this.mouseClick, true );

                this.selectBtn.classList.remove( "selected" );

            } else {

                window.addEventListener('mouseover', this.mouseEnter, false );

                window.addEventListener('mouseout', this.mouseLeave, false );

                document.addEventListener( "click", this.mouseClick, true );

                this.selectBtn.classList.add( "selected" );
            }

        });

    }



    private mouseClick(e: any): void {

        if ( e.target.isSameNode( this.selectBtn ) ) return;


        e.preventDefault();
        e.stopPropagation();

        const selector = unique(e.target, {
            selectorTypes: ['ID', 'Tag', 'NthChild']
        });

        this.targetSelector.innerText = selector;

        const target = document.querySelector( selector ) as HTMLElement;

        console.log( target );

        if ( this.guide ) this.guide.destroy();

        if ( target ) this.guide = new Guide( target );

        return;

    }



    private mouseEnter(e: any): void {

        if ( e.target !== e.currentTarget ) {

            let tgt = e.target;

            tgt.classList.add('outline');

            e.stopPropagation();
        }
    }



    private mouseLeave(e: any): void {

        if ( e.target._onclick ) {
            e.target.onclick = e.target._onclick;
        }

        if ( e.target !== e.currentTarget ) {
            let tgt = e.target;
            tgt.classList.remove('outline');
        }

        e.stopPropagation();
    }


}


new Index();