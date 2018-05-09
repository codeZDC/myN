/*var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '120.77.244.207',
  user     : 'zdc',
  password : '170723',
  database : 'ace_test'
});
console.time('xxx');
connection.connect();

connection.query('SELECT * from t_user', function (error, result, fields) {
  if (error) throw error;
  console.log(result);
  console.timeEnd('xxx');
});*/
const mongoose = require('mongoose');

console.time('xxx')
mongoose.connect('mongodb://127.0.0.1:27017/myN');
const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open',()=>{
    //成功连接
    console.log('success')
    console.timeEnd('xxx')
})