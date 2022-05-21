var express = require('express');
var router = express.Router();
var db = require('../../db')
var random = require('string-random')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 注册 */
router.post('/register', function(req, res, next) {
  const body = req.body
  if (body.email && body.password) {
    db.query(`select * from users where email=${db.escape(body.email)}`,[],function(re, f) {
      if (!re.length) {
        db.query(`insert into users(name ,email, password) value('${random()}', ${db.escape(body.email)}, ${db.escape(body.password)})`,[],function(sue, f) {
          res.json({code: 200, msg: '注册成功'})
        })
        return
      }
      res.json({code: 400, msg: '该邮箱已被注册'})  
    })
  }
});

/* 登录 */
router.post('/login', function(req, res, next) {
  const body = req.body
  if (body.email && body.password) {
    db.query(`select * from users where email=${db.escape(body.email)} and password=${db.escape(body.password)}`,[],function(re, f) {
      if (re.length) {
        const token = random(20)
        db.query(`update users set token='${token}' where uid='${re[0].uid}'`,[],function(sue, f) {
          re[0].token = token
          res.json({code: 200, token: token, msg: '登录成功', data: re[0]})
        })
        return
      }
      res.json({code: 400, msg: '账户或密码不正确'})
    })
  } else {
    res.json({code: 400, msg: `${body.email?'密码':'邮箱'}为空`})
  }
});

/** 获取个人信息 **/
router.get('/userInfo', function(req, res, next) {
  res.json({code: 200, data: req.userInfo, msg: 'ok'})
});

/** 编辑个人信息 **/
router.post('/editUserInfo', function(req, res, next) {
  if (!req.body.avatar) {
    res.send({code: 400, msg: `头像不能为空`})
    return
  } else if (!req.body.name) {
    res.send({code: 400, msg: `名字不能为空`})
    return
  }
  var upConfig = {
    get: {
      id: req.userInfo.id
    },
    set: req.body
  }
  upConfig.set.token && delete upConfig.set.token
  db.update('users', upConfig, function(result) {
    res.json({code: 200, msg: `修改成功`})
  })
});

/** 发帖子 **/
router.post('/post', function(req, res, next) {
  if (!req.body.title) {
    res.send({code: 400, msg: `帖子标题不能为空`})
    return
  }
  if (!req.body.content) {
    res.send({code: 400, msg: `帖子内容不能为空`})
    return
  }
  var obj = {
    title: req.body.title,
    content: req.body.content,
    uid: req.userInfo.id,
    issue_time: new Date().getTime()
  }
  db.insert('posts', obj, function(result) {
    if (result) {
      res.send({code: 200, msg: `发帖成功`})
      return
    }
  })
});

module.exports = router;
