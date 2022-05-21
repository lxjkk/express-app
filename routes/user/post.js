var express = require('express');
var router = express.Router();
var db = require('../../db')
var random = require('string-random')

/* 查看帖子 */
router.post('/getPostInfo', function(req, res, next) {
    const body = req.body
    if (!body.id) {
        res.send({code: 400, msg: '获取帖子信息失败'})
        return
    }
    db.find('posts', {id: body.id}, function(re) {
        if (re.length) {
            db.query(`update posts set read_count=read_count + 1 where id=${db.escape(body.id)}`, [], function(result,f) {
                if (result || f) {
                    res.send({code: 200, data: re[0]})
                }
            })
        } else {
            res.send({code: 400, msg: '获取帖子信息失败'})
        }
    })
});

/* 帖子点赞 */
router.post('/support', function(req, res, next) {
    const body = req.body
    if (!body.fid) {
        res.send({code: 400, msg: '获取帖子信息失败'})
        return
    }
    var obj = {
        fid: body.fid,
        uid: req.userInfo.uid,
    }
    db.find('support_posts', obj, function(re) {
        console.log(11,re);
        if (!re.length) {
            db.insert('support_posts', obj, function (result) {
                if (result) {
                    db.query(`update posts set support_count=support_count + 1 where id=${db.escape(body.fid)}`, [], function(result,f) {
                        if (result || f) {
                            res.send({code: 200, data: '点赞成功'})
                        }
                    })
                }
            })
        } else {
            db.del('support_posts', {fid: body.fid}, function(result) {
                if (result) {
                    db.query(`update posts set support_count=support_count - 1 where id=${db.escape(body.fid)}`, [], function(result,f) {
                        if (result || f) {
                            res.send({code: 200, data: '取消点赞'})
                        }
                    })
                }
            })
        }
    })
});

/* 获取帖子 */
router.get('/getPost', async function(req, res, next) {
    const body = req.query
    const userInfo = req.headers['token'] && await db.token(req.headers['token'])
    const def = {page: Number(body.page) || 1, limit: Number(body.limit) || 10}
    db.query(`select * from posts LEFT JOIN users on users.uid = posts.uid limit ${(def.page -1) * def.limit},${def.limit};`, [], function(allres,indfo) {
        if (allres.length) {
            db.query(`SELECT COUNT(id) as total FROM posts;`, [], function(total,info) {
                // allres.forEach(item => delete token)
                // res.send({code: 200, data: {list: allres,count: total[0].total}})
                if (userInfo) {
                    db.query(`SELECT fid FROM support_posts where uid=${userInfo.uid};`, [], function(supportList) {
                        const arr = []
                        supportList.forEach(item => {
                            arr.push(item.fid)
                        })
                        console.log('!!!',arr);
                        allres.forEach(item => arr.includes(item.id) && (item.is_support = true))
                        res.send({code: 200, data: {list: allres,count: total[0].total}})
                    })
                } else {
                    allres.forEach(item => delete token)
                    res.send({code: 200, data: {list: allres,count: total[0].total}})
                }
                
            })
        } else {
            res.send({code: 400, msg: '获取帖子列表失败'})
        }
        
    })
});
module.exports = router;
