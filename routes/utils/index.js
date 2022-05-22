var express = require('express');
var router = express.Router();
var fs = require('fs')
var random = require('string-random')
const multipart = require('connect-multiparty');
const multipartyMiddleware = multipart();

/* 上传文件 */
router.post('/upload', multipartyMiddleware, async function(req, res, next) {
    const file = req.files.file
    if (file && req.body.base64Data) {
        // try {}
        const f = req.body.base64Data.replace(/^data:image\/\w+;base64,/,'')
        const dataBuffer = new Buffer.from(f, 'base64')
        const date = new Date()
        const name = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay() + 1}` + '_' + random(10) 
        // 获取文件后缀
        const suffix = file.name.substring(file.name.lastIndexOf("."))
        console.log(`public/images/photo/${name + suffix}`);
        fs.writeFile(`public/images/photo/${name + suffix}`, dataBuffer, (err) => {
            if (err) {
                console.log(err);
                res.json({code: 400, msg: '上传失败'})  
            } else {
                res.json({code: 200, data: `${req.protocol + "://" + req.get('host')}/static/images/photo/${name + suffix}`, msg: '上传成功'})  
            }
        })
    } else {
        res.json({code: 400, msg: '请上传文件'})  
    }
});

module.exports = router;
