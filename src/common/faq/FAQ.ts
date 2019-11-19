



export class FAQ {



    constructor() {
        this.registerEventListeners();
    }



    private registerEventListeners(): void {

        const headers = document.getElementsByClassName( "question-head" );

        for ( let i = 0; i < headers.length; i++ ) {
            headers[i].addEventListener( "click", this.itemListener );
        }
    }



    private itemListener(e: any): void {

        const head = e.target.closest( ".question-head" );
        const body = head.parentNode.querySelector( ".question-body" );

        head.parentNode.classList.toggle( "active" );

        body.style.height = body.clientHeight ? 0 : body.scrollHeight + "px";
    }
}
