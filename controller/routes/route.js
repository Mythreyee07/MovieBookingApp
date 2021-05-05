const express = require("express");
const app = express();
const session = require('express-session');
const connection = require('../../model/database');
app.use(session({secret:"Mythusri112000",
                resave:false,
                saveUninitialized:false}))



connection.connect((err)=>{
    if(err)throw err;
    console.log("successfully connected");
})

app.get('/login', (req,res)=>{
    res.render('index');
    
})

app.get('/adminlogin', (req,res)=>{
    res.render('adminlogin');
    
})

app.get('/userlogin', (req,res)=>{
    res.render('userlogin');
    
})


app.post('/uservalidation',(req,res)=>{
    var email=req.body.mail; 
    var password=req.body.pass;

    connection.query('select password from user where email like ?',[email],(err,results)=>{
        req.session.loggedin = true;
        req.session.username = email;

        if (err) throw err;
        console.log(results[0].password);
        console.log(password);
        if(results[0].password==password){
          res.render("userpage");
        }
        else
        {
        res.render("index");
        }
     })
        
})

app.post('/adminvalidation',(req,res)=>{
    var email=req.body.mail; 
    var password=req.body.pass;
           connection.query('select password from admin where email like ?',[email],(_err,result)=>{
            req.session.loggedin = true;
            req.session.username = email;

                if(result[0].password==password)
                {
                    console.log(result[0].password);
                    
                    connection.query('select * from booking',(err,result)=>{

                        res.render("booking", {userData: result });
                })
             }
             else
             {
                res.render("index");
             }
            
        })
        
    })

    app.post('/check',(req,res)=>{
        var name=req.body.mov;
        var seats=req.body.seat;
        var amt = seats*200;
        if(name.length>1 && seats>0)
        {
            connection.query('update booking set no_of_seats_avaliable = no_of_seats_avaliable - ?,no_of_seats_booked=no_of_seats_booked + ? WHERE movie_name = ?',[seats,seats,name]);
            res.render("list",{name1:name,seats1:seats,amt1:amt});
        }
        else{
            alert("your booking is incomplete");
        }
    })

    
    

module.exports=app;
    