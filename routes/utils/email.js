// 邮箱验证
const nodemailer = require("nodemailer");
// fnrdchhoicllcaii 邮箱的授权码
// ygvchpsiqlxbbjdi
// 创建smtp服务器 —— 邮箱验证
const config = {
  host: "smtp.qq.com", //邮箱服务的主机
  port: 465, //对应的端口号
  secureConnection: true,
  service: "qq",
  auth: {
    user: "469191165@qq.com", //发件人邮箱账号
    pass: 'ygvchpsiqlxbbjdi' //邮箱的授权码
  },
};
// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(config);
// 发送邮件
module.exports = function (mail, callback) {
  transporter.sendMail(mail, (err, info) => {
    callback && callback(!err)
  });
};
