var express = require('express')
var app = express()
const path = require('path')

//用户模块
var user = require('./modules/user');
//角色模块
var role = require('./modules/role');



app.use(express.static(path.join(__dirname, 'public')))//静态资源
app.use('/user', user);//用户模块
app.use('/role', role);//角色模块


app.all('/对的萨的撒的飒飒', function (req, res, next) {
  console.log('Accessing all / ...');
  next(); // pass control to the next handler
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/htmls/index.html')
})
//拦截所有的页面访问请求,请求url  *.
app.get(/.html$/, function(req, res) {
	res.sendFile(__dirname + '/htmls/' + req.url)
})
app.listen(3000)

console.log('应用服务启动成功!')

