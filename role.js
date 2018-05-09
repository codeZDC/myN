var express = require('express')
var app = express()
const path = require('path')
//导入querystring模块（解析post请求数据）
var querystring = require('querystring');

//数据库连接
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

console.time('xxx');
MongoClient.connect(url, function(err, db) {
		console.timeEnd('xxx');
	if(err) throw err;
	var dbo = db.db("myN");
	dbo.collection("role").find({}).limit(3).toArray(function(err, result) { // 返回集合中所有数据
		if(err) throw err;
		console.log(result);
		db.close();
	});
});