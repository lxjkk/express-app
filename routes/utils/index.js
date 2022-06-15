var express = require('express');
var router = express.Router();
var fs = require('fs')
var random = require('string-random')
const multipart = require('connect-multiparty');
const multipartyMiddleware = multipart();
const formidable = require('formidable')
const path = require('path')
const fliesRouter = require('express').Router()
/* 上传文件 */
router.post('/upload', async function(req, res, next) {
    console.log(path.join(__dirname, '../../public/images/photo'));
    const form = formidable({
        uploadDir: path.join(__dirname, '../../public/images/photo'), // 上传文件放置的目录
        keepExtensions: true,           //包含源文件的扩展名
        multiples: true                 //多个文件的倍数
      })
      form.parse(req, (err, fields, files) => {
        if (err) {
          res.json({code: 400, msg: '上传失败'})  
          return
        }
        var oldPath = files.file.filepath  //这里的路径是文件的本地路径
        const date = new Date()
        const suffix = files.file.originalFilename.substring(files.file.originalFilename.lastIndexOf("."))  // 获取文件后缀
        const fileName = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay() + 1}` + '_' + random(10) + suffix
        var newPath = path.join(path.dirname(oldPath), fileName);   //文件所在位置的绝对路径
        fs.rename(oldPath, newPath, function () {    //利用fs.rename重命名图片名称
            if(err){
                console.log(err)
                res.json({code: 400, msg: '上传失败'})
            }else {
                console.log('ok')
                res.json({code: 200, data: `${req.protocol + "://" + req.get('host')}/static/images/photo/${fileName}`, msg: '上传成功'}) 
            }
        })
      })
    // const file = req.files.file
    // if (file && req.body.base64Data) {
    //     // try {}
    //     const f = req.body.base64Data.replace(/^data:image\/\w+;base64,/,'')
    //     const dataBuffer = new Buffer.from(f, 'base64')
    //     const date = new Date()
    //     const name = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay() + 1}` + '_' + random(10) 
    //     // 获取文件后缀
    //     const suffix = file.name.substring(file.name.lastIndexOf("."))
    //     console.log(`public/images/photo/${name + suffix}`);
    //     fs.writeFile(`public/images/photo/${name + suffix}`, dataBuffer, (err) => {
    //         if (err) {
    //             console.log(err);
    //             res.json({code: 400, msg: '上传失败'})  
    //         } else {
    //             res.json({code: 200, data: `${req.protocol + "://" + req.get('host')}/static/images/photo/${name + suffix}`, msg: '上传成功'})  
    //         }
    //     })
    // } else {
    //     res.json({code: 400, msg: '请上传文件'})  
    // }
});

module.exports = router;
