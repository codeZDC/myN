/**
 *  用户模块
 */
var express = require('express');
var router = express.Router();
//数据库连接
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";
var ObjectID = require('mongodb').ObjectID; 
var moment = require('moment');
//导入querystring模块（解析post请求数据）
var querystring = require('querystring');

//获取用户列表
router.get('/list', function(req, res) {
	//console.log(req.query);
	var page = Number(req.query.page);
	var limit = Number(req.query.limit);
	var tdata = {
		code: 0,
		msg: "",
		count: 0
	};
	MongoClient.connect(url, function(err, db) {
		if(err) throw err;
		var dbo = db.db("myN");
		dbo.collection("role").count({}, function(err, result) {
			if(err) throw err;
			tdata.count = result;
		})
		dbo.collection("user").find({}).skip((page - 1) * limit).limit(limit).toArray(function(err, result) { // 返回集合中所有数据
			if(err) throw err;
			//console.log('结果 : ');
			//console.log(result);
			db.close();
			// 输出 JSON 格式
			res.writeHead(200, {
				'Content-Type': 'text/json;charset=utf-8'
			}); //设置response编码为utf-8
			result.forEach(function(per){
				if(per.createdTime)
					per.createdTime = moment(per.createdTime).format('YYYY年MM月DD日');
			})
			tdata.data = result
			res.end(JSON.stringify(tdata))
			/*res.json(tdata)
			res.end();*/
		});
	});
});

module.exports = router;