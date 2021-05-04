var express = require('express');
var app = express();

var bodyparser = require('body-parser');
app.use (bodyparser.urlencoded({extended:false}));
app.use(express.static(__dirname));

app.set('views','./views');
app.set('view engine','ejs');

var route = require('./controller/routes/route');
app.use(route);


app.listen(3000,()=>{
    console.log("hey its working!!!!");
})