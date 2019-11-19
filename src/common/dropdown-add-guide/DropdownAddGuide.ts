
import {HTMLHelper} from "../../../../boardme-common/helpers/HTMLHelper";
import {Notifications} from "../../pages/project/Notifications";
import {INotification} from "../../core/INotification";
import {View} from "../../core/View";


const template = require( "../../templates/dropdown-add-guide.html" );





export class DropdownAddGuide extends View {
    protected parent: HTMLElement;
    protected container: HTMLUListElement;

    protected target: HTMLElement;

    protected modalBtn: HTMLElement;
    protected tooltipBtn: HTMLElement;
    protected hotspotBtn: HTMLElement;



    constructor(parent: HTMLElement) {
        super( "DropdownAddGuide" );

        this.parent                 = parent;

        this.container              = document.createElement( "ul" );
        this.container.className    = "add-guide-type-dropdown";

        this.container.innerHTML    = template;

        this.modalBtn               = this.container.querySelector( ".modal" ) as HTMLElement;
        this.tooltipBtn             = this.container.querySelector( ".tooltip" ) as HTMLElement;
        this.hotspotBtn             = this.container.querySelector( ".hotspot" ) as HTMLElement;


        this.parent.appendChild( this.container );


        this.positionDropdown       = this.positionDropdown.bind( this );


    }



    protected registerEventListeners(): void {

        document.addEventListener( "click", (e: any) => {

            if ( ! e.target.classList.contains( "add-guide-btn" ) ) {
                this.container.style.display = "none";
                this.target = null;
            }

        });

        window.addEventListener( "resize", this.positionDropdown );
    }



    private renderDropdown(): void {

        this.container.style.opacity = "0";
        this.container.style.display = "block";

        this.positionDropdown();

        this.container.style.opacity = "1";
    }



    protected positionDropdown(): void {

        if ( ! this.target ) return;

        const y = HTMLHelper.getPositionToTargetId( this.target, this.parent.id ).y;

        const x = this.target.getBoundingClientRect().left;

        let offsetX = 0;
        let offsetY = 0;

        if ( this.target.classList.contains( "empty" ) ) {
            offsetX       = this.container.offsetWidth / 2 - this.target.offsetWidth / 2;
            offsetY       = 50;
        } else {
            offsetX       = this.container.offsetWidth / 2 - this.target.offsetWidth / 2;
            offsetY       = 35;
        }


        this.container.style.left   = `${ x - offsetX }px`;
        this.container.style.top    = `${ y + offsetY }px`;

    }



    public listNotificationInterests(): any[] {
        let notifications = super.listNotificationInterests();

        notifications.push( Notifications.ADD_GUIDE );

        return notifications;
    }



    public handleNotification(notification: INotification) {

        switch ( notification.name ) {

            case Notifications.ADD_GUIDE :

                this.target = notification.data;

                this.renderDropdown();

                break;

            default :
                break;
        }
    }

}
