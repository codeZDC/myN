/**
 * 角色模块
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

//添加角色
router.post('/', function(req, response) {
	/*一次一次的接收数据*/
	var param = '';
	req.on('data', function(data) {
		param += data;
	});
	req.once('end', function() {
		var obj = querystring.parse(param);
		console.log(obj)
		obj.createdTime = Date.now()
		MongoClient.connect(url, function(err, db) {
			if(err) throw err;
			var dbo = db.db("myN");
			dbo.collection("role").insertOne(obj, function(err, res) {
				if(err) throw err;
				console.log('角色文档插入成功')
				db.close();
			});

			response.end('提交成功');
		});
	});
})

//删除角色路由
router.delete('/', function(req, res) {
	//获取角色id然后删除角色
	var param = '';
	req.on('data', function(data) {
		param += data;
	});
	req.on('end', function(data) {
		var obj = querystring.parse(param);
		var _id = querystring.parse(param)._id;
		MongoClient.connect(url, function(err, db) {
		if(!err) {
			var dbo = db.db("myN");
			dbo.collection('role').deleteOne({
				'_id' : ObjectID(_id)
			}, function(err, obj) {
				if(!err) {
					console.log("删除文档成功_" + _id);
					db.close()
				}
				})
			}
		})
		res.end('删除成功')
	});
})

//更新角色路由
router.put('/', function(req, res) {
		var param = '';
	req.on('data', function(data) {
		param += data;
	});
	req.on('end', function(data) {
		var obj = querystring.parse(param);
		//console.log(obj)
		var data = {};
		data.roleName = obj.roleName
		data.remarks = obj.remarks
		MongoClient.connect(url, function(err, db) {
			if(!err) {
				var dbo = db.db("myN");
				dbo.collection('role').updateOne(
				{'_id' : ObjectID(obj._id)},{$set:data},
				function(err, obj2) {
					if(!err) {
						console.log("更新文档成功_" + obj._id);
						db.close()
					}
					})
				}
			})
			res.end('更新成功')
	});
})

//获取角色列表
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
		dbo.collection("role").find({}).skip((page - 1) * limit).limit(limit).toArray(function(err, result) { // 返回集合中所有数据
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
			console.log(result)
			tdata.data = result
			res.end(JSON.stringify(tdata))
			/*res.json(tdata)
			res.end();*/
		});
	});
});

module.exports = router;