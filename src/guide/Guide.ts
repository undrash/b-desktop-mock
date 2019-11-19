

import Popper, { Data, Placement } from "popper.js";


const template = require( "../templates/tooltip.html" );



export class Guide {

    private target: HTMLElement;
    private guide: HTMLElement;



    constructor(target: HTMLElement) {

        this.target = target;

        this.guide = document.createElement( "div" );
        this.guide.innerHTML    = template;
        this.guide.id           = "boardme";
        this.guide.classList.add( "boardme-guide" );

        document.body.appendChild( this.guide );


        this.initPopper();
    }



    private initPopper(): void {

        new Popper( this.target, this.guide, {
            placement: "auto",
            modifiers: {
                offset: {
                    enabled: true,
                    offset: "0, 20"
                },

                preventOverflow: {
                    escapeWithReference: true
                }

            }
        });

    }



    public destroy(): void {

        this.guide.parentElement.removeChild( this.guide );
    }

}