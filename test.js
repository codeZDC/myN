var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require('mongodb').ObjectID;  
//连接数据库  
//假如数据库不存在，会自动创建一个数据库  
var url = "mongodb://127.0.0.1:27017/myN";
console.time('xx');
MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	var dbo = db.db("myN");
	dbo.collection('role').find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
        db.close();
	console.timeEnd('xx');
    });
});
/*const mongoose = require('mongoose');

console.time('xxx')
mongoose.connect('mongodb://127.0.0.1:27017/myN');
const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open',()=>{
    //成功连接
    console.log('success')
    console.timeEnd('xxx')
})*/

var moment = require('moment');
var formatDate = moment(1525851050996).format('YYYY-MM-DD HH:mm:ss'); /*格式化时间*/
console.log(formatDate)

var a = 110;
console.log(a||520)
