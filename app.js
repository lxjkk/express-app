var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db')

var indexRouter = require('./routes/user/index');
var postRouter = require('./routes/user/post');
var utilsRouter = require('./routes/utils');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
console.log('!!!', __dirname);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// 实现静态资源访问功能
// express.static的参数为静态资源的存放目录，建议用绝对路径
app.use('/static',express.static(path.join(__dirname,'public')));


app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","*");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
});
function escape (opt) {
  for (const key in opt) {
    opt[key] = db.escape(opt[key])
  }
  return opt
}
// 拦截器
app.use(function(req,res,next) {
  var request = req.path
  var interceptor = ['/api/user/login', '/api/user/register', '/api/post/getPost', '/api/post/getPostInfo', '/api/post/getComment', '/api/post/search', '/api/post/getHot', '/api/post/getRecommend']
  if (interceptor.includes(request)) {
    next()
  } else {
    req.headers['token'] ? db.token(req.headers['token'], function (result) {
        result ? (req.userInfo=result,next()) : res.send({
          code:202,
          msg: '请先登录'
        })
      }) : res.send({
        code:202,
        msg: '请先登录'
      })
  }
});
app.use('/api/user', indexRouter);
app.use('/api/post', postRouter);
app.use('/api/utils', utilsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.on('end',function(){
  console.log('ends'); 
 });
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
process.env.PORT = 2000;

module.exports = app;
