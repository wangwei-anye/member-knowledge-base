var express = require("express");
const fs = require("fs");
var app = express();

//设置跨域访问
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//获取websocket状态
app.get("/", function(req, res) {
  var params = req.query
  if(params.action == 'check'){
    fs.readFile("./websocketStatus", "utf-8", function(err, data) {
      if (err) {
        throw err;
      }
      res.status(200), res.json(data);
    });
  }else if(params.action == 'updated'){
    fs.writeFile("./websocketStatus", "0", function(err, data) {
      if (err) {
        throw err;
      }
      res.status(200), res.json('ok');
    });
  }else{
    fs.writeFile("./websocketStatus", "1", function(err, data) {
      if (err) {
        throw err;
      }
      res.status(200), res.json('ok');
    });
  }
  
});

//配置服务端口
var server = app.listen(20092, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("listening at 20092");
});
