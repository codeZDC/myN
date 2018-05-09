var express = require("express");
var MongoClient = require("mongodb").MongoClient;

//连接数据库  
//假如数据库不存在，会自动创建一个数据库  
var url = "mongodb://localhost:27017/myN";
console.time('xx');
MongoClient.connect(url, function(err, db) {
	console.timeEnd('xx');
	if(err) throw err;
	var dbo = db.db("myN");
	dbo.collection("role").find({}).toArray(function(err, result) { // 返回集合中所有数据
		if(err) throw err;
		console.log('结果 : ');
		console.log(result);
		db.close();
	});
});