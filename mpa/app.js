var express = require('express');

var app =express();

app.set('views', './views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'))

app.get('/', function(req,res){
    var data = {
        message: 'this is message',
        date: new Date()
    }
    res.render('index', data);

    });



// app.get('/', function(req,res){

//     console.log(__dirname);

//     res.render('index',{});
   
//     // res.sendFile(__dirname +'/index.html'); //정적파일 내보낼때
// });

app.get('/service', function(req,res){

    res.render('service', {});
});

app.get('/product', function(req,res){

    res.render('product', {});
});

app.get('index.css', function(req,res) {
    res.sendFile(__dirname +'/index.css');
});

app.listen(3000);