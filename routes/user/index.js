var express = require('express');
var moment = require('moment')
var router = express.Router();
var db = require('../../db')
var random = require('string-random');

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
          res.json({code: 200, msg: '注册成功!'})
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
    res.json({code: 400, msg: `头像不能为空`})
    return
  } else if (!req.body.name) {
    res.json({code: 400, msg: `用户名不能为空`})
    return
  }
  var upConfig = {
    get: {
      uid: req.userInfo.uid
    },
    set: req.body
  }

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
  const imgeArr = []
  req.body.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, capture) {
    imgeArr.push(capture);
  });
  console.log('时间', moment().format('YYYY-MM-DD HH:ss:mm'));
  var obj = {
    title: req.body.title,
    content: req.body.content,
    image: imgeArr[0] || null,
    describes: req.body.content.replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi, ""),
    uid: req.userInfo.uid,
    issue_time: moment().format('YYYY-MM-DD HH:ss:mm')
  }
  console.log(obj.issue_time);
  db.insert('posts', obj, function(result) {
    if (result) {
      res.send({code: 200, data: result.insertId, msg: `发帖成功`})
      return
    }
  })
});

/** 评论帖子 **/
router.post('/comment', async function(req, res, next) {
  console.log(req.body);
  if (!req.body.id) {
    res.send({code: 400, msg: `该帖子不存在`})
    return
  }
  if (!req.body.content) {
    res.send({code: 400, msg: `请输入评论内容`})
    return
  }
  var obj = {
    post_id: req.body.id,
    content: req.body.content,
    uid: req.userInfo.uid,
    create_time: moment().format('YYYY-MM-DD hh:ss:mm')
  }
  const r = await db.query(`select * from posts where id=?`, [obj.post_id])
  if (r.length > 0) {
    db.insert('comment', obj, function(result) {
      if (result) {
        res.send({code: 200, msg: `操作成功`})
        return
      }
    })
  } else {
    res.send({code: 400, msg: `该帖子不存在`})
  }
});

/** 回复评论 **/
router.post('/reply', async function(req, res, next) {
  console.log(req.body);
  if (!req.body.content) {
    res.send({code: 400, msg: `请输入回复内容`})
    return
  }
  var obj = {
    content: req.body.content,
    uid: req.userInfo.uid,
    create_time: moment().format('YYYY-MM-DD hh:ss:mm')
  }
  let r = []
  r = req.body.id ? await db.query(`select * from reply where id=?`, [req.body.id]) : await db.query(`select * from comment where id=?`, [req.body.comment_id])
  console.log(r);
  if (r.length > 0) {
    const {uid, comment_id, id} = r[0]
    obj.to_uid = uid
    obj.comment_id = req.body.id ? comment_id : id
    db.insert('reply', obj, function(result) {
      if (result) {
        res.send({code: 200, msg: `操作成功`})
      }
    })
  } else {
    res.send({code: 400, msg: `该评论不存在`})
  }
});

module.exports = router;
