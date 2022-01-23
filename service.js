var http = require('http');
var url = require('url');
var util = require('util');
var fs = require("fs");

http.createServer(function (request, response) {
	 response.writeHead(200, {'Content-Type': 'text/plain' , "Access-Control-Allow-Origin": "*"});
	// 解析 url 参数
    var params = url.parse(request.url, true).query;
    var action = params.action

    if(action == "check") {
    	fs.stat('./websocketStatus', function (err, stats) {
	    	if (err) {
			       return console.error(err);
			}
		    // console.log(stats);
			var data = fs.readFileSync('./websocketStatus');
			response.end(data);
		});

    }else if(action == "updating") {
	    fs.writeFile('./websocketStatus', '1',  function(err) {
			if (err) {
		       return console.error(err);
			}
	    });
	    response.end("ok");
	}else if(action == "updated") {
	    fs.writeFile('./websocketStatus', '0',  function(err) {
			if (err) {
		       return console.error(err);
			}
	    });
	    response.end("ok");
	}

}).listen(20092);

// 终端打印如下信息
console.log('Server running at http://0.0.0.0:20092/');

