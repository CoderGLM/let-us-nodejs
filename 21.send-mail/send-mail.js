/*
 *    我只想说代码没问题，公司网不行，真的很恶心
 */
import nodemailer from 'nodemailer';

// 建立一个SMTP传输链接
var transporter = nodemailer.createTransport({
    service: 'QQ',
    auth: {
        user: "xxxxxxx@qq.com",
        pass: "XXXXX" // 这里不是你的邮箱密码，是授权密码
    }
});
// 邮件选
var options = {
    from: "xxxxxxx@qq.com",
    to: "xxx@qq.com",
    subject: '标题',
    text: 'Hello world',
    html: '<b>Hello world</b>'
};

// 发邮件
transporter.sendMail(options, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Message sent: ${res.message}`);
    }
});