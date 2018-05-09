var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'zdc123',
  database : 'ace_test'
});
console.time('xxx');
connection.connect();

connection.query('SELECT * from t_user', function (error, result, fields) {
  if (error) throw error;
  console.log(result);
  console.timeEnd('xxx');
});

