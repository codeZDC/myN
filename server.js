var express = require('express')
var app = express()
const path = require('path')
//导入querystring模块（解析post请求数据）
var querystring = require('querystring');

//数据库连接
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/htmls/index.html')
})
//拦截所有的页面访问请求,请求url  *.
app.get('*.html', function(req, res) {
	res.sendFile(__dirname + '/htmls/' + req.url)
})

//获取用户列表
app.get('/user/list', function(req, res) {
	console.log('当前第 ' + req.query.page + ' 页每页显示 ' + req.query.limit + ' 条');
	var users = [{
			id: 1,
			username: 'zdc',
			sex: '男',
			city: '贵阳',
			sign: '代码工人',
			experience: '0',
			score: '0',
			classify: '程序员',
			wealth: '500'
		},
		{
			id: 2,
			username: '林文迪',
			sex: '女',
			city: '遵义',
			sign: '幼儿之家',
			experience: '120',
			score: '120',
			classify: '教师',
			wealth: '5000'
		}, {
			id: 3,
			username: 'zdc',
			sex: '男',
			city: '贵阳',
			sign: '代码工人',
			experience: '0',
			score: '0',
			classify: '程序员',
			wealth: '500'
		},
		{
			id: 4,
			username: '林文迪',
			sex: '女',
			city: '遵义',
			sign: '幼儿之家',
			experience: '120',
			score: '120',
			classify: '教师',
			wealth: '5000'
		}, {
			id: 5,
			username: 'zdc',
			sex: '男',
			city: '贵阳',
			sign: '代码工人',
			experience: '0',
			score: '0',
			classify: '程序员',
			wealth: '500'
		},
		{
			id: 6,
			username: '林文迪',
			sex: '女',
			city: '遵义',
			sign: '幼儿之家',
			experience: '120',
			score: '120',
			classify: '教师',
			wealth: '5000'
		}, {
			id: 7,
			username: 'zdc',
			sex: '男',
			city: '贵阳',
			sign: '代码工人',
			experience: '0',
			score: '0',
			classify: '程序员',
			wealth: '500'
		},
		{
			id: 8,
			username: '林文迪',
			sex: '女',
			city: '遵义',
			sign: '幼儿之家',
			experience: '120',
			score: '120',
			classify: '教师',
			wealth: '5000'
		}, {
			id: 9,
			username: 'zdc',
			sex: '男',
			city: '贵阳',
			sign: '代码工人',
			experience: '0',
			score: '0',
			classify: '程序员',
			wealth: '500'
		},
		{
			id: 10,
			username: '林文迪',
			sex: '女',
			city: '遵义',
			sign: '幼儿之家',
			experience: '120',
			score: '120',
			classify: '教师',
			wealth: '5000'
		}
	]

	var result = {
		code: 0,
		msg: "",
		count: 1000
	};
	if(req.query.page > 1) {
		result.data = [{
				id: 11,
				username: '林文迪',
				sex: '女',
				city: '遵义',
				sign: '幼儿之家',
				experience: '120',
				score: '120',
				classify: '教师',
				wealth: '5000'
			},
			{
				id: 12,
				username: '林文迪',
				sex: '女',
				city: '遵义',
				sign: '幼儿之家',
				experience: '120',
				score: '120',
				classify: '教师',
				wealth: '5000'
			}
		]
	} else {
		result.data = users
	}
	res.send(result);
})
/*{field: 'id', title: 'ID', width:80, sort: true, fixed: 'left'}
      ,{field: 'username', title: '用户名', width:80}
      ,{field: 'sex', title: '性别', width:80, sort: true}
      ,{field: 'city', title: '城市', width:80} 
      ,{field: 'sign', title: '签名', width: 177}
      ,{field: 'experience', title: '积分', width: 80, sort: true}
      ,{field: 'score', title: '评分', width: 80, sort: true}
      ,{field: 'classify', title: '职业', width: 80}
      ,{field: 'wealth', title: '财富', width: 135, sort: true}
*/

app.listen(3000)

console.log('服务启动成功!')

/* 角色处理部分  */
/* 角色处理部分  */
/* 角色处理部分  */ /* 角色处理部分  */ /* 角色处理部分  */ /* 角色处理部分  */
//添加角色
app.post('/role/add', function(req, response) {
	/*一次一次的接收数据*/
	var param = '';
	req.on('data', function(data) {
		param += data;
	});
	req.once('end', function() {
		var obj = querystring.parse(param);
		console.log(obj)
		MongoClient.connect(url, function(err, db) {
			if(err) throw err;
			var dbo = db.db("myN");
			dbo.collection("role").insertOne(obj, function(err, res) {
				if(err) throw err;
				console.log('角色文档插入成功')
				//db.close();
			});
			
			response.end('提交成功');
		});
	});
})

//获取角色列表
app.get('/roles', function(req, res) {
	console.log(req.query);
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
		dbo.collection("role").count({},function(err,result){
			if(err) throw err;
			tdata.count = result;
		})
		dbo.collection("role").find({}).skip((page-1)*limit).limit(limit).toArray(function(err, result) { // 返回集合中所有数据
			if(err) throw err;
			console.log('结果 : ');
			console.log(result);
			//db.close();
			// 输出 JSON 格式
			res.writeHead(200, {
				'Content-Type': 'text/json;charset=utf-8'
			}); //设置response编码为utf-8
			tdata.data = result
			res.end(JSON.stringify(tdata))
		});
	});
});

