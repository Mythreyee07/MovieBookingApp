const mysql = require("mysql2");
const connect = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'movie_app',
    port:'3306'
});
module.exports=connect;