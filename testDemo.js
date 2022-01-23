//初始化模块
var shell = require("shelljs");
var exec = shell.exec;
const YAML = require("yamljs");
const fs = require("fs");
var path = require("path");
const markdowner = require("markdown-it");
var md = new markdowner({
  html: true,
  langPrefix: "code-"
});

//临时文件夹
var tempDirName = "knowledgeTemple";
var copyDirName = "member-knowledge-base";
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
      "dd01-member-api-gateway-kit/api-docs/gateway_api.yml",
      "dd01-member-api-gateway-kit/api-docs/frontend_description.md",
      "dd01-member-api-gateway-kit/api-docs/backend_description.md",
      "dd01-member-api-gateway-kit/api-docs/global_description.md",
      "dd01-member-api-gateway-kit/api-docs/frontend_backend_description.md"
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
    targetName: [
      "dd01-member-account-system-kit/dev/resources/api-docs/api-docs.yml"
    ],
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
    targetName: ["dd01-member-tenant-system/dev/storage/api-docs/api-docs.yml"],
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
    targetName: [
      "dd01-member-ios-sdk/Document/SDK接入文档-RN桥接.html",
      "dd01-member-ios-sdk/Document/SDK接入文档-原生.html"
    ]
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
    targetName: [
      "dd01-member-points-core-system-kit/dev/resources/api-docs/api-docs.yml"
    ],
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
    targetName: ["dd01-member-android-sdk/document/SDK接入文档-原生.html"]
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

function loadHandle() {
  if (loadIndex < loadDataArr.length) {
    startLoad();
  }
}
function startLoad() {
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
    var data=fs.readFileSync(loadDataArr[loadIndex].originName[j],'utf-8');
    fs.writeFile(
      `../opt/app/${loadDataArr[loadIndex].targetName[j]}`,
      data,
      err => {
        loadTotal++;
        if (loadTotal === loadDataArr[loadIndex].originName.length) {
          loadIndex++;
          loadHandle();
        }
      }
    );
  }
}
