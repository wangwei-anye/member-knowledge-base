//初始化模块
const YAML = require("yamljs");
const fs = require("fs");
const markdowner = require("markdown-it");
var md = new markdowner({
  html: true,
  langPrefix: "code-"
});

//复制的文件夹目录
var copyFromDirName = "/opt/app/";
if (process.argv.length > 2) {
  copyFromDirName = process.argv[2];
}

var loadDataArr = [
  {
    name: "网关",
    originName: [
      "dd01-member-api-gateway-kit/api-docs/gateway_api.yml",
      "dd01-member-api-gateway-kit/api-docs/frontend_description.md",
      "dd01-member-api-gateway-kit/api-docs/backend_description.md",
      "dd01-member-api-gateway-kit/api-docs/global_description.md",
      "dd01-member-api-gateway-kit/api-docs/frontend_backend_description.md"
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
    originName: ["dd01-member-account-system-kit/dev/resources/api-docs/api-docs.yml"],
    targetName: ["api.js"],
    createApiName: "apiData"
  },
  {
    name: "合作伙伴",
    originName: ["dd01-member-tenant-system/dev/storage/api-docs/api-docs.yml"],
    targetName: ["partner.js"],
    createApiName: "partner"
  },
  {
    name: "IOS",
    originName: [
      "dd01-member-ios-sdk/Document/SDK接入文档-RN桥接.html",
      "dd01-member-ios-sdk/Document/SDK接入文档-原生.html"
    ],
    targetName: ["rn.html", "ios.html"]
  },
  {
    name: "积分核心系统",
    originName: ["dd01-member-points-core-system-kit/dev/resources/api-docs/api-docs.yml"],
    targetName: ["pointsCoreSystem.js"],
    createApiName: "pointsCoreSystemData"
  },
  {
    name: "安卓",
    originName: ["dd01-member-android-sdk/document/SDK接入文档-原生.html"],
    targetName: ["android.html"]
  }
];

var loadIndex = 0;
//开始下载
loadHandle();

function loadHandle() {
  if (loadIndex < loadDataArr.length) {
    startLoad();
  }else{
    console.log("全部拷贝完成");
  }
}
function startLoad() {
  var data;
  var loadTotal = 0;
  for (var j = 0; j < loadDataArr[loadIndex].originName.length; j++) {
    var type = loadDataArr[loadIndex].originName[j].substring(
      loadDataArr[loadIndex].originName[j].length - 3,
      loadDataArr[loadIndex].originName[j].length
    );
    loadDataArr[loadIndex].originName[j] = copyFromDirName + loadDataArr[loadIndex].originName[j];
    if (type === "yml") {
      console.log("开始拷贝文件：" + loadDataArr[loadIndex].originName[j]);
      data = YAML.parse(
        fs.readFileSync(loadDataArr[loadIndex].originName[j]).toString() || ""
      );
      fs.writeFile(
        `./document/js/${loadDataArr[loadIndex].targetName[j]}`,
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
        `./document/js/${loadDataArr[loadIndex].targetName[j]}`,
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
        `./document/js/${loadDataArr[loadIndex].targetName[j]}`,
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
