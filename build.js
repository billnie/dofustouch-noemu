"use strict"
const builder = require("electron-builder")
const Platform = builder.Platform

// Promise is returned
builder.build({
    targets: Platform.MAC.createTarget(),
    config: {

    }
})
    .then(() => {
        // handle result
    })
    .catch((error) => {
        console.log(error);
    });