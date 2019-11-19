///<reference path="../../../node_modules/@types/node/globals.d.ts"/>

import {CoreEntity} from "../../core/CoreEntity";


declare const TweenLite: any;
declare const Power0: any;
declare const Back: any;


import "../../style/header.scss";


const template = require( "../../templates/header.html" );





export class Header extends CoreEntity{
    private container: HTMLElement;

    private profileBtn: HTMLElement;
    private menuItemProjects: HTMLElement;
    private menuItemThemes: HTMLElement;
    private userName: HTMLElement;
    private accountAcronym: HTMLElement;
    private accountName: HTMLElement;
    private accountEmail: HTMLElement;

    private userMenuDropDown: HTMLElement;



    constructor() {
        super( "Header" );

        this.container = document.getElementById( "header-container" );

        this.container.innerHTML = template;

        this.profileBtn                 = document.getElementById( "user-menu" );

        this.menuItemProjects           = document.getElementById( "header-menu-projects" );
        this.menuItemThemes             = document.getElementById( "header-menu-themes" );

        this.userName                   = document.getElementById( "header-menu-user-name" );
        this.accountAcronym             = document.getElementById( "header-user-account-acronym" );
        this.accountName                = document.getElementById( "header-user-account-name" );
        this.accountEmail               = document.getElementById( "header-user-account-email" );

        this.userMenuDropDown           = document.getElementById( "header-user-menu-dropdown" );

        this.profileBtnListener         = this.profileBtnListener.bind( this );
        this.documentClickListener      = this.documentClickListener.bind( this );

        this.enterScene();
    }



    private registerEventListeners(): void {
        this.profileBtn.addEventListener( "click", this.profileBtnListener );
        document.addEventListener( "click", this.documentClickListener );
    }



    private profileBtnListener(): void {

        if ( this.profileBtn.classList.contains( "active" ) ) {
            this.profileBtn.classList.remove( "active" );
            this.hideUserMenuDropdown();
        } else {
            this.profileBtn.classList.add( "active" );
            this.showUserMenuDropdown();
        }
    }



    private documentClickListener(e: any): void {

        if ( e.target.id !== this.profileBtn.id && e.target.id !== this.userName.id ) {
            this.profileBtn.classList.remove( "active" );
            this.hideUserMenuDropdown();
            e.stopPropagation();
        }
    }



    private showUserMenuDropdown(): void {
        this.userMenuDropDown.style.display = "block";
        TweenLite.to( this.userMenuDropDown, 0.2, { opacity: 1, ease: Power0.easeOut } );
    }



    private hideUserMenuDropdown(): void {
        TweenLite.to( this.userMenuDropDown, 0.1, { opacity: 0, onComplete: () => {
            this.userMenuDropDown.style.display = "none";
        }});
    }



    private setActiveMenuItem(): void {

        const url = window.location.href;

        if ( url.substr( -"projects".length ) === "projects" ) this.menuItemProjects.classList.add( "active" );
        if ( url.substr( -"themes".length ) === "themes" ) this.menuItemThemes.classList.add( "active" );

    }



    private populate(): void {
        this.connection.getCurrentUser()
            .done( (user: any) => {

                this.userName.innerText         = user.firstName;
                this.accountAcronym.innerText   = user.firstName[0] + user.lastName[0];
                this.accountName.innerText      = `${ user.firstName} ${ user.lastName }`;
                this.accountEmail.innerText     = user.email;

            })
            .fail( (err: any) => console.error( err ) )
    }



    private enterScene(): void {
        this.registerEventListeners();
        this.setActiveMenuItem();
        this.populate();
    }
}