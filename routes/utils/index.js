var express = require('express');
var router = express.Router();
var fs = require('fs')
var random = require('string-random')
const multipart = require('connect-multiparty');
const multipartyMiddleware = multipart();

/* 上传文件 */
router.post('/upload', multipartyMiddleware, function(req, res, next) {
    const file = req.body.file
    if (file) {
        // try {}
        const f = file.replace(/^data:image\/\w+;base64,/,'')
        const dataBuffer = new Buffer.from(f, 'base64')
        console.log(2);
        const date = new Date()
        const name = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay() + 1}` + '_' + random(10) 
        fs.writeFile(`public/images/photo/${name}.png`, dataBuffer, (err) => {
            if (err) {
                console.log(err);
                res.json({code: 400, msg: '上传失败'})  
            } else {
                res.json({code: 200, data: `${req.protocol + "://" + req.get('host')}/static/images/photo/${name}.png`, msg: '上传成功'})  
            }
        })
    } else {
        res.json({code: 400, msg: '请上传文件'})  
    }
});

module.exports = router;
