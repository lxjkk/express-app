var express = require('express');
var router = express.Router();
var db = require('../../db')
var random = require('string-random')

/* 查看帖子 */
router.get('/getPostInfo', async function(req, res, next) {
    const body = req.query
    if (!body.id) {
        res.send({code: 400, msg: '获取帖子信息失败'})
        return
    }
    const userInfo = req.headers['token'] && await db.token(req.headers['token'])
    db.find('posts', {id: body.id}, function(re) {
        if (re.length) {
            db.query(`update posts set read_count=read_count + 1 where id=${db.escape(body.id)}`, [], function(result,f) {
                if (result || f) {
                    db.query(`select id, content, title, users.uid, image, support_count, read_count, type, issue_time, users.name, users.avatar from posts LEFT JOIN users on users.uid = posts.uid where posts.id = ${body.id}`, [], function(selectRes) {
                        const data = selectRes[0]
                        if (userInfo) {
                            db.query(`SELECT fid FROM support_posts where uid=${userInfo.uid};`, [], function(supportList) {
                                const arr = []
                                supportList.forEach(item => {
                                    arr.push(item.fid.toString())
                                })
                                data.is_support = arr.includes(body.id)
                                res.send({code: 200, data: data})
                            })
                        } else {
                            res.send({code: 200, data: data})
                        }
                    })
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
    db.query(`select id, content, title, users.uid, describes, image, support_count, read_count, type, issue_time, users.name, users.avatar from posts LEFT JOIN users on users.uid = posts.uid ORDER BY posts.issue_time DESC limit ?,?;`, [(def.page -1) * def.limit, def.limit], function(allres,indfo) {
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
// 获取评论
router.get('/getComment', async function(req, res, next) {
    const body = req.query
    if (!body.id) {
        res.send({code: 400, msg: '获取评论失败'})
        return
    }
    const def = {page: Number(body.page) || 1, limit: Number(body.limit) || 10}
    db.query(`SELECT sql_calc_found_rows id, content, comment.uid, create_time, users.name, users.avatar FROM comment LEFT JOIN users on users.uid = comment.uid WHERE post_id=? ORDER BY comment.create_time DESC limit ?,?;
    select FOUND_ROWS() as total;`, [body.id, (def.page -1) * def.limit, def.limit], (arr) => {
        const list = arr[0]
        // list.length && arr[2].forEach(item => {
        //     list.find((i,index) => {
        //     if (item.reply_id == i.id) {
        //             list[index].comment = list[index].comment ? list[index].comment.concat(item) : [item]
        //         }
        //     })
        // })
        console.log(2222222,list);
        let commentIdList = []
        list.forEach(item => {
            commentIdList.push(db.query('select id, content, create_time, reply.uid, reply.comment_id, users.name, users.avatar, to_user.name as to_name, to_user.avatar as to_avater from reply LEFT JOIN users on users.uid = reply.uid LEFT JOIN users as to_user on to_user.uid = reply.to_uid where comment_id=? ORDER BY reply.create_time DESC;', [item.id]))
        })
        Promise.all(commentIdList).then(value => {
            list.forEach((item,index) => {
                item.comment = value[index]
            })
            const data = {
                code: 200,
                data: {
                    list: list,
                    total: arr[1][0].total
                }
            }
            res.send(data)
        })
    })
})
module.exports = router;
