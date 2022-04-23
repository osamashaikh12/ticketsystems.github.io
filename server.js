const express = require('express');
const fs = require('fs');
const url = require('url');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const http = require('http'); // Loads the http module
port = 8080;

app.use(bodyParser.json());
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));
// app.use(upload.array());
app.use(cookieParser());

app.post("/UpdateInfo/", [], function (req, res) {

    console.log(req.body);
    {
        myobj = {
            reqid: req.body.reqid
            , firstname: req.body.firstname
            , lastname: req.body.lastname
            , template: req.body.template
            , subject: req.body.subject
            , res: req.body.res
        };
        // console.log(p_url);
        var data = JSON.stringify(req.body);
        var mysql = require('mysql');

        var con = mysql.createConnection({
            host: "localhost",
            user: "osamashaikh",
            password: "Os@ma1995",
            database: "mydb"
        });

        con.connect(function (err) {
/*            if (err) throw err;*/
            console.log("Connected!");
            var sql = "INSERT INTO clientticket (reqid, firstname, lastname, template, subject, res) VALUES(?,?,?,?,?,?)";
            var query = mysql.format(sql, [req.body.reqid, req.body.firstname, req.body.lastname, req.body.template, req.body.subject, req.body.res])
            con.query(query, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        });

        con.connect(function (err) {
/*            if (err) throw err;*/
            con.query("SELECT * FROM clientticket", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
            });
        });

        res.send("Saved")
    }
});
app.post("/Updatedata/", [], function (req, res) {

    console.log(req.body);
    {
        var mysql = require('mysql');

        var con = mysql.createConnection({
            host: "localhost",
            user: "osamashaikh",
            password: "Os@ma1995",
            database: "mydb"
        });

        con.connect(function (err) {
            if (err) throw err;
            //Update the address field:
            var sql = "UPDATE clientticket SET firstname =?, lastname =? ,template =? ,subject =?, res =? WHERE reqid = ?";
            var query = mysql.format(sql, [req.body.firstname, req.body.lastname, req.body.template, req.body.subject, req.body.res, req.body.reqid])
            con.query(query, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
            });
        });
    }
});
app.post("/deletedata/", [], function (req, res) {

    console.log(req.body);
    {
        var mysql = require('mysql');

        var con = mysql.createConnection({
            host: "localhost",
            user: "osamashaikh",
            password: "Os@ma1995",
            database: "mydb"
        });
        con.connect(function (err) {
            if (err) throw err;
            var sql = "DELETE FROM clientticket WHERE reqid = ?";
            var query = mysql.format(sql, [req.body.reqid])
            con.query(query, function (err, result) {
                if (err) throw err;
                console.log("Number of records deleted: " + result.affectedRows);
            });
        });
    }
});


app.post("/search/", [], function (req, res) {

    console.log(req.body);
    var data = {
        reqid: "hello",
        firstname: "osama",
        lastname: "shaikh"
    }
    res.render("updateform", {data:data});
    res.end();
    {
        var mysql = require('mysql');

        var con = mysql.createConnection({
            host: "localhost",
            user: "osamashaikh",
            password: "Os@ma1995",
            database: "mydb"
        });

        con.connect(function (err) {
            if (err) throw err;
            var sql = "SELECT * FROM clientticket where reqid = ?";
            var query = mysql.format(sql, [req.body.search])
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                console.log(query);
                console.log(result);
                req.body.reqid = result.reqid
                req.body.firstname = result.firstname
                req.body.lastname = result.lastname
                req.body.template = result.template
                req.body.subject = result.subject
                req.body.res = result.res
            });
        });
        /*req.render()*/
    }
});
/*
app.get("/UpdateInfo/", [], function (req, res) {

    console.log(req.body);
    {
        myobj = {
            reqid: req.body.reqid
            , firstname: req.body.firstname
            , lastname: req.body.lastname
            , template: req.body.template
            , subject: req.body.subject
            , res: req.body.res
        };
        // console.log(p_url);
        var data = JSON.stringify(req.body);
        var mysql = require('mysql');

        var con = mysql.createConnection({
            host: "localhost",
            user: "osamashaikh",
            password: "Os@ma1995",
            database: "mydb"
        });

        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO clientticket (reqid, firstname, lastname, template, subject, res) VALUES(?,?,?,?,?,?)";
            var query = mysql.format(sql, [req.body.reqid, req.body.firstname, req.body.lastname, req.body.template, req.body.subject, req.body.res])
            con.query(query, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        });

        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT * FROM clientticket", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
            });
        });

        res.send("Saved")
    }
});

app.get("/search/", [], function (req, res) {

    console.log(req.body);
    res.writeHead(301, { Location: 'update.html' });
    res.end();
    {
        var mysql = require('mysql');

        var con = mysql.createConnection({
            host: "localhost",
            user: "osamashaikh",
            password: "Os@ma1995",
            database: "mydb"
        });

        con.connect(function (err) {
            if (err) throw err;
            var sql = "SELECT * FROM clientticket where reqid = ?";
            var query = mysql.format(sql, [req.body.search])
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                console.log(query);
                console.log(result);
            });
        });

app.get("/Updatedata/", [], function (req, res) {

    console.log(req.body);
    {
        var mysql = require('mysql');

        var con = mysql.createConnection({
            host: "localhost",
            user: "osamashaikh",
            password: "Os@ma1995",
            database: "mydb"
        });

        con.connect(function (err) {
            if (err) throw err;
            //Update the address field:
            var sql = "UPDATE clientticket SET address = '(reqid, firstname, lastname, template, subject, res)'";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
            });
        });
        con.connect(function (err) {
            if (err) throw err;
            var sql = "DELETE FROM clientticket WHERE address = '(reqid, firstname, lastname, template, subject, res)'";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Number of records deleted: " + result.affectedRows);
            });
        });
    }
});
*/
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin, X - Requested - With, Content - Type, Accept, content - type, application / json');
    next();
});

app.get("", function (req, res) {
    res.sendFile('index.html', {
        root: __dirname
    })
});
app.listen(port, () => {
    console.log(`Server running on port:${port}`);
});
