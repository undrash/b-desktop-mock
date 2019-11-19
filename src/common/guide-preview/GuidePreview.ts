
import {PopperHelper} from "../../../../boardme-common/helpers/PopperHelper";
import {InteractionType} from "../../connection/constants/InteractionType";
import {TemplateType} from "../../connection/constants/TemplateType";
import {ConnectionProxy} from "../../connection/ConnectionProxy";
import {GuideType} from "../../connection/constants/GuideType";
import {Notifications} from "../../pages/guide/Notifications";
import {INotification} from "../../core/INotification";
import {View} from "../../core/View";


const modalTemplate     = require( "../../../../boardme-common/templates/modal.html" );
const tooltipTemplate   = require( "../../../../boardme-common/templates/tooltip.html" );
const hotspotTemplate   = require( "../../../../boardme-common/templates/hotspot.html" );



export class GuidePreview {
    private container: HTMLElement;

    private previewGuide: HTMLElement;
    private previewGuideTitle: HTMLElement;
    private previewGuideDescription: HTMLElement;
    private previewCloseBtn: HTMLElement;
    private previewDismissBtn: HTMLElement;
    private previewPreviousBtn: HTMLElement;
    private previewActionBtn: HTMLElement;
    private previewImageElement: HTMLElement;
    private previewHTMLContentContainer: HTMLElement;
    private previewArrow: HTMLElement;
    private previewContent: HTMLElement;
    private previewModalOverlay: HTMLElement;
    private previewButtonContainer: HTMLElement;
    


    constructor(container: HTMLElement, guide: any, editable?: boolean) {

        this.container = container;

        this.generatePreview( guide, editable );
    }





    private replaceButtonTagsWithDivs(): void {

        const buttons = this.container.querySelectorAll( "button" );

        for ( let i = 0; i < buttons.length; i++ ) {

            let src, el, attrs;

            for( let i = 0, l = buttons.length; i < l; i++ ) {

                if ( ! buttons[i].parentNode ) continue;

                src     = buttons[i];
                el      = document.createElement("div" );

                attrs = src.attributes;

                for( let j = 0, k = attrs.length; j < k; j++ ) {
                    el.setAttribute( attrs[j].name, attrs[j].value );
                }

                el.innerHTML    = src.innerHTML;

                src.parentNode.replaceChild( el, src );
            }

        }
    }



    private generatePreview(guide: any, editable?: boolean): void {


        switch ( guide.type ) {

            case GuideType.TOOLTIP :

                this.container.innerHTML            = tooltipTemplate;

                if ( editable ) this.replaceButtonTagsWithDivs();

                this.previewGuide                   = this.container.firstElementChild as HTMLElement;
                this.previewGuideTitle              = this.container.querySelector( ".boardme-guide-title" ) as HTMLElement;
                this.previewGuideDescription        = this.container.querySelector( ".boardme-guide-description" ) as HTMLElement;
                this.previewCloseBtn                = this.container.querySelector( ".boardme-dismiss-guide-btn" ) as HTMLElement;
                this.previewDismissBtn              = this.container.querySelector( ".boardme-dismiss-guide-text-btn" ) as HTMLElement;
                this.previewPreviousBtn             = this.container.querySelector( ".boardme-guide-previous-btn" ) as HTMLElement;
                this.previewActionBtn               = this.container.querySelector( ".boardme-guide-action-btn" ) as HTMLElement;
                this.previewImageElement            = this.container.querySelector( ".boardme-guide-image" ) as HTMLElement;
                this.previewHTMLContentContainer    = this.container.querySelector( ".boardme-htmlcontent" ) as HTMLElement;
                this.previewArrow                   = this.container.querySelector( ".boardme-arrow-image") as HTMLElement;
                this.previewContent                 = this.container.querySelector( ".boardme-guide-wrapper" ) as HTMLElement;
                this.previewButtonContainer         = this.container.querySelector( ".boardme-button-wrapper" ) as HTMLElement;

                this.previewGuide.setAttribute( "x-placement", PopperHelper.getPopperPlacement( guide.position ) );

                this.configureGuidePreview( guide );

                this.styleTooltipPreview( guide.theme );

                break;

            case GuideType.HOTSPOT :

                this.container.innerHTML            = hotspotTemplate;

                if ( editable ) this.replaceButtonTagsWithDivs();

                this.previewGuide                   = this.container.firstElementChild as HTMLElement;
                this.previewGuideTitle              = this.container.querySelector( ".boardme-guide-title" ) as HTMLElement;
                this.previewGuideDescription        = this.container.querySelector( ".boardme-guide-description" ) as HTMLElement;
                this.previewCloseBtn                = this.container.querySelector( ".boardme-dismiss-guide-btn" ) as HTMLElement;
                this.previewDismissBtn              = this.container.querySelector( ".boardme-dismiss-guide-text-btn" ) as HTMLElement;
                this.previewPreviousBtn             = this.container.querySelector( ".boardme-guide-previous-btn" ) as HTMLElement;
                this.previewActionBtn               = this.container.querySelector( ".boardme-guide-action-btn" ) as HTMLElement;
                this.previewImageElement            = this.container.querySelector( ".boardme-guide-image" ) as HTMLElement;
                this.previewHTMLContentContainer    = this.container.querySelector( ".boardme-htmlcontent" ) as HTMLElement;
                this.previewArrow                   = this.container.querySelector( ".boardme-arrow-image") as HTMLElement;
                this.previewContent                 = this.container.querySelector( ".boardme-guide-wrapper" ) as HTMLElement;
                this.previewButtonContainer         = this.container.querySelector( ".boardme-button-wrapper" ) as HTMLElement;

                this.previewGuide.setAttribute( "x-placement", PopperHelper.getPopperPlacement( guide.position ) );

                this.configureGuidePreview( guide );

                this.styleHotspotPreview( guide.theme );

                break;

            case GuideType.MODAL :

                this.container.innerHTML            = modalTemplate;

                if ( editable ) this.replaceButtonTagsWithDivs();

                this.previewGuide                   = this.container.querySelector( ".boardme-modal" ) as HTMLElement;
                this.previewGuideTitle              = this.container.querySelector( ".boardme-guide-title" ) as HTMLElement;
                this.previewGuideDescription        = this.container.querySelector( ".boardme-guide-description" ) as HTMLElement;
                this.previewCloseBtn                = this.container.querySelector( ".boardme-dismiss-guide-btn" ) as HTMLElement;
                this.previewDismissBtn              = this.container.querySelector( ".boardme-dismiss-guide-text-btn" ) as HTMLElement;
                this.previewPreviousBtn             = this.container.querySelector( ".boardme-guide-previous-btn" ) as HTMLElement;
                this.previewActionBtn               = this.container.querySelector( ".boardme-guide-action-btn" ) as HTMLElement;
                this.previewImageElement            = this.container.querySelector( ".boardme-guide-image" ) as HTMLElement;
                this.previewHTMLContentContainer    = this.container.querySelector( ".boardme-htmlcontent" ) as HTMLElement;
                this.previewContent                 = this.container.querySelector( ".boardme-guide-wrapper" ) as HTMLElement;
                this.previewModalOverlay            = this.container.querySelector( ".boardme-modal-overlay" ) as HTMLElement;
                this.previewButtonContainer         = this.container.querySelector( ".boardme-button-wrapper" ) as HTMLElement;

                this.configureGuidePreview( guide );

                this.styleModalPreview( guide.theme );

                break;

            default :
                break;
        }

    }



    private configureGuidePreview(guide: any, fromPreview?: boolean): void {

        if ( ! fromPreview ) {

            if ( guide.title ) {

                if ( guide.title !== this.previewGuideTitle.innerHTML ) {

                    this.previewGuideTitle.innerHTML = guide.title;
                    this.previewGuide.classList.remove( "no-title" );
                }

            } else {
                this.previewGuideTitle.innerHTML = '';
                this.previewGuide.classList.add( "no-title" );
            }

            if ( guide.description ) {

                if ( guide.description !== this.previewGuideDescription.innerHTML ) {

                    this.previewGuideDescription.innerHTML = guide.description;
                    this.previewGuide.classList.remove( "no-description" );
                }

            } else {
                this.previewGuideDescription.innerHTML = '';
                this.previewGuide.classList.add( "no-description" );
            }

            if ( guide.dismissBtnTitle ) {

                if ( guide.dismissBtnTitle !== this.previewDismissBtn.innerHTML ) {

                    this.previewDismissBtn.innerHTML = guide.dismissBtnTitle;
                }

            } else {
                this.previewDismissBtn.style.display = "none";
            }

            if ( guide.actionBtnTitle ) {

                if ( guide.actionBtnTitle !== this.previewActionBtn.innerHTML ) {

                    this.previewActionBtn.innerHTML = guide.actionBtnTitle;
                }

            } else {
                this.previewActionBtn.style.display = "none";
            }

        }


        if ( guide.image ) {
            this.previewImageElement.style.backgroundImage = `url('${ ConnectionProxy.getAddress() }/api/v1/images/${ guide.image }')`;
            this.previewImageElement.style.display = "inline-block";
            this.previewGuide.classList.remove( "no-image" );
        } else {
            this.previewImageElement.style.display = "none";
            this.previewGuide.classList.add( "no-image" );
        }

        if ( guide.htmlContent ) {
            this.previewHTMLContentContainer.innerHTML = guide.htmlContent;
        } else {
            this.previewHTMLContentContainer.style.display = "none";
        }

        if ( ! guide.enablePreviousBtn ) {
            this.previewPreviousBtn.style.display = "none";
        }


        switch ( guide.templateType ) {
            case TemplateType.WITH_BUTTONS :

                if ( guide.type === GuideType.MODAL ) {
                    this.previewButtonContainer.style.display = "inline-block";
                } else {
                    this.previewButtonContainer.style.display = "block";
                }

                break;

            case TemplateType.TEXT_ONLY :
                this.previewButtonContainer.style.display = "none";
                break;
            default :
                break;
        }

        if ( guide.hasCloseBtn ) {
            this.previewCloseBtn.style.display = "block";
        } else {
            this.previewCloseBtn.style.display = "none";
        }

        if ( guide.hasDismissBtn ) {
            this.previewDismissBtn.style.display = "block";
        } else {
            this.previewDismissBtn.style.display = "none";
        }

        if ( guide.interactionType === InteractionType.ACTION_DRIVEN ) {
            this.previewCloseBtn.style.display          = "none";
            this.previewButtonContainer.style.display   = "none";
        }
    }



    private styleTooltipPreview(theme: any): void {

        this.previewGuideTitle.style.fontFamily        = theme.titleFont;
        this.previewGuideDescription.style.fontFamily  = theme.standardFont;
        this.previewActionBtn.style.color              = theme.buttonTextColor;
        this.previewActionBtn.style.backgroundColor    = theme.buttonColor;
        this.previewActionBtn.style.borderRadius       = `${ theme.buttonRadius }px`;
        this.previewDismissBtn.style.color             = theme.dismissLinkColor;
        this.previewGuide.style.borderRadius           = `${ theme.backgroundShapeRadius }px`;
        this.previewContent.style.borderRadius         = `${ theme.backgroundShapeRadius }px`;
        this.previewGuideTitle.style.color             = theme.tooltipTextColor;
        this.previewGuideDescription.style.color       = theme.tooltipTextColor;
        this.previewGuide.style.backgroundColor        = theme.tooltipBackgroundColor;
        this.previewGuide.style.boxShadow              = `${ theme.tooltipShadowY }px ${ theme.tooltipShadowX }px ${ theme.tooltipShadowBlur }px ${ theme.tooltipShadowSpread }px ${ theme.tooltipShadowColor }`;
        this.previewArrow.style.fill                   = theme.tooltipBackgroundColor;
        this.previewPreviousBtn.style.borderColor      = theme.buttonColor;
        this.previewPreviousBtn.style.color            = theme.buttonColor;
        this.previewPreviousBtn.style.borderRadius     = `${ theme.buttonRadius }px`;

    }



    private styleHotspotPreview(theme: any): void {

        this.previewGuideTitle.style.fontFamily        = theme.titleFont;
        this.previewGuideDescription.style.fontFamily  = theme.standardFont;
        this.previewActionBtn.style.color              = theme.buttonTextColor;
        this.previewActionBtn.style.backgroundColor    = theme.buttonColor;
        this.previewActionBtn.style.borderRadius       = `${ theme.buttonRadius }px`;
        this.previewDismissBtn.style.color             = theme.dismissLinkColor;
        this.previewGuide.style.borderRadius           = `${ theme.backgroundShapeRadius }px`;
        this.previewContent.style.borderRadius         = `${ theme.backgroundShapeRadius }px`;
        this.previewGuideTitle.style.color             = theme.tooltipTextColor;
        this.previewGuideDescription.style.color       = theme.tooltipTextColor;
        this.previewGuide.style.backgroundColor        = theme.tooltipBackgroundColor;
        this.previewGuide.style.boxShadow              = `${ theme.tooltipShadowY }px ${ theme.tooltipShadowX }px ${ theme.tooltipShadowBlur }px ${ theme.tooltipShadowSpread }px ${ theme.tooltipShadowColor }`;
        this.previewArrow.style.fill                   = theme.tooltipBackgroundColor;
        this.previewPreviousBtn.style.borderColor      = theme.buttonColor;
        this.previewPreviousBtn.style.color            = theme.buttonColor;
        this.previewPreviousBtn.style.borderRadius     = `${ theme.buttonRadius }px`;
    }



    private styleModalPreview(theme: any): void {

        this.previewGuideTitle.style.fontFamily         = theme.titleFont;
        this.previewGuideDescription.style.fontFamily   = theme.standardFont;
        this.previewActionBtn.style.color               = theme.buttonTextColor;
        this.previewActionBtn.style.backgroundColor     = theme.buttonColor;
        this.previewActionBtn.style.borderRadius        = `${ theme.buttonRadius }px`;
        this.previewDismissBtn.style.color              = theme.dismissLinkColor;
        this.previewGuide.style.borderRadius            = `${ theme.backgroundShapeRadius }px`;
        this.previewGuideTitle.style.color              = theme.modalTextColor;
        this.previewGuideDescription.style.color        = theme.modalTextColor;
        this.previewGuide.style.backgroundColor         = theme.modalBackgroundColor;
        this.previewModalOverlay.style.backgroundColor  = theme.modalOverlayColor;
        this.previewModalOverlay.style.opacity          = `${ theme.modalOverlayOpacity }`;
        this.previewGuide.style.boxShadow               = `${ theme.modalShadowY } ${ theme.modalShadowX } ${ theme.modalShadowBlur } ${ theme.modalShadowSpread } ${ theme.modalShadowColor }`;
        this.previewPreviousBtn.style.borderColor       = theme.buttonColor;
        this.previewPreviousBtn.style.color             = theme.buttonColor;
        this.previewPreviousBtn.style.borderRadius      = `${ theme.buttonRadius }px`;
    }



    public update(guide: any, fromPreview?: boolean): void {

        this.configureGuidePreview( guide, fromPreview );

        this.previewGuide.removeAttribute( "x-placement" );

        switch ( guide.type ) {

            case GuideType.TOOLTIP :

                this.previewGuide.setAttribute( "x-placement", PopperHelper.getPopperPlacement( guide.position ) );

                this.styleTooltipPreview( guide.theme );

                break;

            case GuideType.HOTSPOT :

                this.previewGuide.setAttribute( "x-placement", PopperHelper.getPopperPlacement( guide.position ) );

                this.styleHotspotPreview( guide.theme );

                break;

            case GuideType.MODAL :

                this.styleModalPreview( guide.theme );

                break;

            default :
                break;
        }
    }

}
