const http = require("http");
const Browser = require("zombie");
const { resolve, reject } = require("bluebird");

const hostname = "127.0.0.1";
const port = 3000;


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});
process.argv.forEach((val, index) => {
  if (index == 2) {
    printValue(val);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function printValue(key) {
  let html = await getTextHtml();
  let firstFoundIndex = html.indexOf(key);
  if (firstFoundIndex != -1) {
    let textFocus = html.substring(firstFoundIndex, html.length - 1);
    let texts = textFocus.split("</td><td>");

    console.log("==============================================");
    console.log(texts[1]);
  }
}

function getTextHtml() {
  return new Promise((resolve, reject) => {
    let browser = new Browser();
    let url = "https://codequiz.azurewebsites.net/";
    browser
      .visit(url)
      .then(() => {
        console.log(`Visited ${url}..`);
        browser.pressButton("Accept").then(() => {
          resolve(browser.html());
        });
      })
      .catch((error) => {
        console.error(`Error occurred visiting ${url}`);
        reject(error);
      });
  });
}
