var shell = require("shelljs");
var exec = shell.exec;

const YAML = require("yamljs");
const fs = require("fs");
const markdowner = require("markdown-it");
var md = new markdowner({
  html: true,
  langPrefix: "code-"
});

// //解析网关文档
// var data = YAML.parse(fs.readFileSync("./partner.yml").toString());
// fs.writeFile(
//   "./document/js/partner.js",
//   "var partner = " + JSON.stringify(data),
//   error => {
//     console.log(error);
//   }
// );

data = md.render(
  fs.readFileSync("./md/knowledge-base-homepage.md").toString() || ""
);
fs.writeFile(
  "./document/js/knowledge-base-homepage.html",
  data,
  error => {
    console.log(error);
  }
);
