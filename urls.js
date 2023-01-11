const fs = require('fs');
const process = require('process');
const axios = require('axios');

//get path of text file from user input
path = process.argv[2];

let URLS = [];


fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
        console.log(`not valid path: ${path}`, err);
        process.exit(1);
    }
    //split string to get URLS and store in array
    URLS = data.toString().split("\n");
    createHTML(URLS);
})




async function createHTML(links) {
    for (let url of URLS) {
        try {
            let HTML = await axios.get(url);
            let newFile = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];

            fs.writeFile(newFile, HTML.data, "utf8", (err) => {
                if (err) {
                    console.log("error");
                }
                console.log(`Wrote to ${newFile}`);
            })
        }
        catch (err) {
            console.log(`Couldn't download ${url}`);
        }
    };
};