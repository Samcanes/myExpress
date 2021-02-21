var express = require('express');
const { setupBackgroundApp } = require('fcc-express-bground');
var app = express();

console.log("Hello World");
require('dotenv').config()
let bodyParser = require('body-parser')


// 7

app.use(function middleware(req, res, next) {
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    // Call the next function in line:
    next();
});

//11

app.use(bodyParser.urlencoded({
    extended: false
}))




// 3
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// 4

app.use('/public', express.static(__dirname + "/public"));

// 5

// app.get("/json", function(req, res) {
//     res.json( { "message": "Hello json" })
// });

//6

app.get("/json", function(req, res) {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        console.log('1')
        console.log(process.env.MESSAGE_STYLE)
        res.json({ "message": "HELLO JSON" })
    } else {
        console.log("2")
        console.log(process.env.MESSAGE_STYLE)
        res.json({ "message": "Hello json" })
    }

});


// 8

app.get('/now', function(req, res, next) {
    console.log("///////")
    console.log(new Date())
    req.time = new Date().toString();
    next();
}, function(req, res) {
    console.log(".......")
    res.json({ 'time': req.time });
});

//9

app.get('/:words/echo', (req, res) => {
    console.log(req.params);
    res.json({ 'echo': req.params.words })
})

//10



app.get("/name", function(req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;
    var { first: firstName, last: lastName } = req.query;
    res.json({
        name: `${firstName} ${lastName}`
    });
});

//12
app.post("/name", bodyParser.urlencoded({
        extended: false
    }),
    (req, res) => {
        console.log("run hota hai")
        var firstName = req.body.first;
        var lastName = req.body.last;
        var { first: firstName, last: lastName } = req.body;
        res.json({
            name: `${firstName} ${lastName}`
        });

    })

module.exports = app;