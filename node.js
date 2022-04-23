var express = require('express');
var fs = require('fs');
var url = require('url');
var bodyParser=require('body-parser'); 
var multer=require('multer'); 
var upload = multer();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();
app.use(bodyParser.json());
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));
// app.use(upload.array());
app.use(cookieParser());
app.post("/information/",[],function(req,res){
    console.log(req.body);
    {
    myobj = {
        reqid :req.body.reqid
        firstname :req.body.firstname
        lastname :req.body.lastname
        template :req.body.template
        subject :req.body.subject
        res :req.body.res
    };
// console.log(p_url);
var data = JSON.stringify(req.body);
// MongoClient.connect(url,function(err, db) {
//     if(err)throwerr;
//     dbo = db.db('mydb');
//     dbo.collection("group").insertOne(myobj,function(err, res) {
//         if(err)throwerr;
//         console.log("1 document inserted");
//         db.close();
//     });
// });
res.send("Saved")}
});

app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin", '*');
res.header("Access-Control-Allow-Credentials", true);
res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
res.header("Access-Control-Allow-Headers", 'Origin, X - Requested - With, Content - Type, Accept, content - type, application / json');
next();
});

app.get("",function(req,res){
res.sendFile('ticket.html',{
    root:__dirname
})
});
app.listen(8080);