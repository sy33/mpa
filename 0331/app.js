var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var auth = require('./auth');
var app = express();

app.use(session({
    secret: 'sdsdsd'
}));

app.set('views', './views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
/**
 * 기본적으로 express는 http 메소드의 body 내용을 가져오지 않음.
 * 따라서 body-parser라는 라이브러리를 사용해서
 * body 내용을 일을 수 있도록 해야함.
 */

 /**
  * 미들웨어 
  *   
  * 
  */

app.use(bodyParser());
// app.use(req,res,next)=>{
//     if(req.session.email){
//         next();
//     }else{
//         res.render('login',{})
//     }
// }

app.use((req,res,next)=>{
    console.log(new Date());
    next();
});

function authroize(req,res,next){
    if(req.session.email){
        next();
    }else{
        res.render('login',{})
    }
}


app.get('/', authroize, (req,res,next)=>{
    //로그인 안되어 있으면  login 페이지로 이동
    res.render('index', {});
    // if(req.session.email){
    //     res.render('index', {});
    // }else{
    //     res.redirect('/login');
    // }

});

app.get('/login', (req,res,next)=>{
    res.render('login',{});
})

app.post('/login', (req,res,next)=>{  // 이메일 정보 있음 req

    var email = req.body.email;
    var password = req.body.password;

    var result = auth.login(email,password);
    
    if(result){
        //성공 시에는 index 페이지로 이동
        req.session.email = email; // Session0에 사용자 email 저장
        res.redirect('/');
    }else{
        //실패시에는 어떤 메세지를 전달
        res.redirect('/login');
    }

});

app.listen(3000);

