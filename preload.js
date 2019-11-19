
const path              = require("path");
const fs                = require('fs');

const sourceDir = path.resolve( __dirname, "preload" );

window.ipc = require('electron').ipcRenderer;

process.once( 'document-start', () => {

    console.log( "PRELOADER" );

    console.log( `${ sourceDir }/index.bundle.js` );

    const content = fs.readFileSync( `${ sourceDir }/index.bundle.js`, "utf8" );

    setTimeout( () => {

        const script = document.createElement('script');
        script.textContent = content;


        document.documentElement.appendChild( script );

    }, 1000 );

});
