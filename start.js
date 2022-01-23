//初始化模块
var shell = require("shelljs");
var exec = shell.exec;
const YAML = require("yamljs");
const fs = require("fs");
const markdowner = require("markdown-it");
var md = new markdowner({
  html: true,
  langPrefix: "code-"
});

//临时文件夹
var tempDirName = "knowledgeTemple";
var copyDirName = "knowledge";
var branch = "dev";
var accountName = "dd01memberbot";
var password = "4cdd9947769038e268888943c73cc46a2304bfcc";


var loadDataArr = [
  {
    name: "网关",
    dev: "development",
    internal: "development",
    staging: "development",
    production: "development",
    docName: "api-docs",
    remoteUrl: `https://${accountName}:${password}@github.com/dadi01/dd01-member-api-gateway-kit.git`,
    originName: [
      "./api-docs/gateway_api.yml",
      "./api-docs/frontend_description.md",
      "./api-docs/backend_description.md",
      "./api-docs/global_description.md",
      "./api-docs/frontend_backend_description.md"
    ],
    targetName: [
      "gateway_api.js",
      "frontend_description.html",
      "backend_description.html",
      "global_description.html",
      "frontend_backend_description.html"
    ],
    createApiName: "gateway_apiData"
  },
  {
    name: "账号系统",
    dev: "development",
    internal: "development",
    staging: "development",
    production: "development",
    docName: "/dev/resources/api-docs/api-docs.yml",
    remoteUrl: `https://${accountName}:${password}@github.com/dadi01/dd01-member-account-system-kit.git`,
    originName: ["./dev/resources/api-docs/api-docs.yml"],
    targetName: ["api.js"],
    createApiName: "apiData"
  },
  {
    name: "合作伙伴",
    dev: "development",
    internal: "development",
    staging: "development",
    production: "development",
    docName: "/dev/storage/api-docs/api-docs.yml",
    remoteUrl: `https://${accountName}:${password}@github.com/dadi01/dd01-member-tenant-system.git`,
    originName: ["./dev/storage/api-docs/api-docs.yml"],
    targetName: ["partner.js"],
    createApiName: "partner"
  },
  {
    name: "IOS",
    dev: "development",
    internal: "development",
    staging: "development",
    production: "development",
    docName: "Document",
    remoteUrl: `https://${accountName}:${password}@github.com/dadi01/dd01-member-ios-sdk.git`,
    originName: [
      "./Document/SDK接入文档-RN桥接.html",
      "./Document/SDK接入文档-原生.html"
    ],
    targetName: ["rn.html", "ios.html"]
  },
  {
    name: "积分核心系统",
    dev: "development",
    internal: "development",
    staging: "development",
    production: "development",
    docName: "/dev/resources/api-docs/api-docs.yml",
    remoteUrl: `https://${accountName}:${password}@github.com/dadi01/dd01-member-points-core-system-kit.git`,
    originName: ["./dev/resources/api-docs/api-docs.yml"],
    targetName: ["pointsCoreSystem.js"],
    createApiName: "pointsCoreSystemData"
  },
  {
    name: "安卓",
    dev: "development",
    internal: "development",
    staging: "development",
    production: "development",
    docName: "document",
    remoteUrl: `https://${accountName}:${password}@github.com/dadi01/dd01-member-android-sdk.git`,
    originName: ["./document/SDK接入文档-原生.html"],
    targetName: ["android.html"]
  }
];

if (process.argv.length > 2) {
  branch = process.argv[2];
}
var loadIndex = 0;
//创建临时文件夹 下载git
shell.cd("../");
exec(`mkdir ${tempDirName}`);
shell.cd(tempDirName);
//开始下载
loadHandle();
//删除临时文件夹
// shell.cd("../");
// deleteDir(`./${tempDirName}`);

function loadHandle() {
  if (loadIndex < loadDataArr.length) {
    startLoad();
  }
}
function startLoad() {
  var data;
  console.log(`开始下载${loadDataArr[loadIndex].name}`);
  exec("git init");
  exec("git remote rm origin");
  exec(`git remote add -f origin ${loadDataArr[loadIndex].remoteUrl}`);
  exec("git config core.sparsecheckout true");
  exec(`echo ${loadDataArr[loadIndex].docName} >> .git/info/sparse-checkout`);
  exec("git fetch --all");
  exec(`git reset --hard origin/${loadDataArr[loadIndex][branch]}`);
  exec(`echo git success`);
  var loadTotal = 0;
  for (var j = 0; j < loadDataArr[loadIndex].originName.length; j++) {
    var type = loadDataArr[loadIndex].originName[j].substring(
      loadDataArr[loadIndex].originName[j].length - 3,
      loadDataArr[loadIndex].originName[j].length
    );
    if (type === "yml") {
      console.log("开始拷贝文件：" + loadDataArr[loadIndex].originName[j]);
      data = YAML.parse(
        fs.readFileSync(loadDataArr[loadIndex].originName[j]).toString() || ""
      );
      fs.writeFile(
        `../${copyDirName}/document/js/${loadDataArr[loadIndex].targetName[j]}`,
        `var ${loadDataArr[loadIndex].createApiName} = ` + JSON.stringify(data),
        err => {
          console.log("拷贝成功");
          loadTotal ++ ;
          if(loadTotal === loadDataArr[loadIndex].originName.length){
            loadIndex++;
            loadHandle();
          }
        }
      );
    } else if (type === "tml") {
      console.log("开始拷贝文件：" + loadDataArr[loadIndex].originName[j]);
      data = fs.readFileSync(loadDataArr[loadIndex].originName[j]).toString() || "";
      fs.writeFile(
        `../${copyDirName}/document/js/${loadDataArr[loadIndex].targetName[j]}`,
        data,
        err => {
          console.log("拷贝成功");
          loadTotal ++ ;
          if(loadTotal === loadDataArr[loadIndex].originName.length){
            loadIndex++;
            loadHandle();
          }
        }
      );
    } else {
      console.log("开始拷贝文件：" + loadDataArr[loadIndex].originName[j]);
      data = md.render(
        fs.readFileSync(loadDataArr[loadIndex].originName[j]).toString() || ""
      );
      fs.writeFile(
        `../${copyDirName}/document/js/${loadDataArr[loadIndex].targetName[j]}`,
        data,
        err => {
          console.log("拷贝成功");
          loadTotal ++ ;
          if(loadTotal === loadDataArr[loadIndex].originName.length){
            loadIndex++;
            loadHandle();
          }
        }
      );
    }
  }
}
//删除文件夹
function deleteDir(path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function(file, index) {
      var curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        deleteDir(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}
