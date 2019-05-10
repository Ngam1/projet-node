var express=require('express');
var url = require("url");
var querystring = require('querystring');
var path=require('path');
const dbConnex=require('databaseConnect');
//var session = require('express-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app=express();

//connection a une base de donnee

let con=dbConnex.getConnection(dbConnex.Config);

app.use(bodyParser.urlencoded({ extended: false }))
.get('/', function(req, res){
     res.render('index.ejs',{data:[]});
    //   var parametres= querystring.parse(url.parse(req.url).query);
    //   console.log(parametres);
    // sess=req.session;
    // sess.nom='rakoto';
    //  console.log(sess.nom);
})
.get('/find',function(req,res){
    //async/await formulation
    let result=getResult();
    res.render('index.ejs',{data:result});
    // dbConnex.find('employe',null,con).then((result)=>{
    //     res.render('index.ejs',{data:result});
    // }).catch((error)=>{
    //     console.log(error);
    // });
})
.post('/insert',urlencodedParser,(req,res)=>{
    let obj=req.body;
    dbConnex.insert(obj,"employe",con).then((message)=>{
        res.render('index.ejs',{insertDone:message,data:[]});
    }).catch((error)=>{
        console.log(error);
    });
})
.get('/error',function(req,res){
	 res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
}); 
async function getResult(){
    let result=await dbConnex.find('employe',null,con);
    return result;
}
app.listen(8080);