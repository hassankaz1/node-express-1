const fs = require("fs");
const process = require("process");
const axios = require("axios");

//get path of text file from user input
path = process.argv[2];

fs.readFile(path, "utf8", (err, data) => {
  if (err) {
    console.log(`not valid path: ${path}`, err);
    process.exit(1);
  }
  //split string to get URLS and store in array
  const urls = data.toString().split("\n");
  createHTML(urls);
});

async function createHTML(urls) {
  const pages = await pagesHtml(urls);

  for (let i = 0; i < urls.length; i++) {
    if (pages[i].status === "rejected") {
      console.log("Could not download: " + urls[i]);
      continue;
    }

    const newFile = hostnameFromUrl(urls[i]);

    fs.writeFile(newFile, pages[i].value.data, "utf8", (err) => {
      if (err) {
        console.log("error");
      }
      console.log(`Wrote to ${newFile}`);
    });
  }
}

function pagesHtml(urls) {
  const promises = urls.map((url) => {
    return axios.get(url);
  });

  return Promise.allSettled(promises);
}

function hostnameFromUrl(url) {
  return new URL(url).hostname;
}
