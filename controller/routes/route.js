const express = require("express");
const app = express();
const router=express.Router();
const connection = require('../../model/database');


connection.connect((err)=>{
    if(err)throw err;
    console.log("successfully connected");
})

router.get('/login', (req,res)=>{
    res.render('index');
    
})

router.get('/adminlogin', (req,res)=>{
    res.render('adminlogin');
    
})

router.get('/userlogin', (req,res)=>{
    res.render('userlogin');
    
})


router.post('/uservalidation',(req,res)=>{
    var email=req.body.mail; 
    var password=req.body.pass;
    connection.query('select password from user where email like ?',[email],(err,results)=>{
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

router.post('/adminvalidation',(req,res)=>{
    var email=req.body.mail; 
    var password=req.body.pass;
           connection.query('select password from admin where email like ?',[email],(_err,result)=>{
                if(result[0].password==password)
                {
                    console.log(result[0].password);
                    
                    connection.query('select * from booking',(err,result)=>{

                        res.render("booking", {userData: result });
                })
             }
            
        })
        
    })

    router.post('/check',(req,res)=>{
        var name=req.body.mov;
        var seats=req.body.seat;
        var amt = seats*200;
        if(name.length>1 && seats>0)
        {
            connection.query('update booking set no_of_seats_avaliable = no_of_seats_avaliable - ?,no_of_seats_booked=no_of_seats_booked + ? WHERE movie_name = ?',[seats,seats,name]);
            res.render("list",{name1:name,seats1:seats,amt1:amt});
        }
    })

module.exports=router;
    