var router = [
  {
    name: "首页",
    url: "./index.html"
  },
  {
    name: "会员系统前端API",
    url: "./会员系统前端API.html",
    tags: ["会员套件", "API"]
  },
  {
    name: "会员系统后端API",
    url: "./会员系统后端API.html",
    tags: ["会员套件", "API"]
  },
  {
    name: "积分系统前端API",
    url: "./积分系统前端API.html",
    tags: ["会员套件", "API"]
  },
  {
    name: "积分系统后端API",
    url: "./积分系统后端API.html",
    tags: ["会员套件", "API"]
  },
  {
    name: "Android SDK",
    url: "./会员系统Android SDK.html",
    tags: ["会员套件", "SDK"]
  },
  {
    name: "iOS SDK",
    url: "./会员系统iOS SDK.html",
    tags: ["会员套件", "SDK"]
  },
  {
    name: "React Native SDK",
    url: "./会员系统React Native SDK.html",
    tags: ["会员套件", "SDK"]
  },
  {
    name: "合作伙伴后端API",
    url: "./合作伙伴后端API.html",
    tags: ["API"]
  }
];

function getUrlParams() {
  // 假如当前的url为localhost:8080?a=1&b=2
  // location的search属性获取到 ?a=1&b=2  字符串
  let searchStr = window.location.search;
  let qs = searchStr ? searchStr.substring(1) : "";
  // 要是没有url参数，temp为空数组
  let temp = qs.length ? qs.split("&") : [];
  let len = temp.length;
  let paraObj = {};
  let item;
  for (let i = 0; i < len; i++) {
    item = temp[i].split("=");
    // 对两项进行解码再保存在对象中
    paraObj[decodeURIComponent(item[0])] = decodeURIComponent(item[1]);
  }
  return paraObj;
}

var search = getUrlParams();
if (search.action == "forceUpdate") {
  $.ajax({
    type: "GET",
    url: "http://112.74.181.137:20092/?action=updated",
    dataType: "json",
    success: function(res) {
		window.location.href = window.location.origin + window.location.pathname;
	}
  });
}
