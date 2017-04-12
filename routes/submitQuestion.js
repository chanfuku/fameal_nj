const express = require('express');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const router = express.Router();
const ua = require('universal-analytics');

let transporter = nodemailer.createTransport( smtpTransport({
    host : process.env.EMAIL_HOST,
    port : 587,
    auth : {
        user : process.env.EMAIL_USER, // メールアドレス
        pass : process.env.EMAIL_PASS // メールアドレスパスワード
    }
}));

let visitor = ua('UA-97242923-1');

// お問い合わせメール送信
router.post('/', function (req, res) {
    // Message object
    var mes = req.body
    let message = {
        from: 'fameal <' + process.env.EMAIL_USER + '>',
        to: mes.email,
        bcc: process.env.EMAIL_USER,
        subject: '[fameal]お問い合わせ受付完了',
        text: mes.name + '様のお問い合わせ内容は' + mes.detail + 'です。'
    };

    res.contentType('application/json');
    transporter.sendMail(message, (error, info) => {
        // ToDo: エラーハンドリング
        if (error) {
            console.log('Error occurred');
            console.log(error);
            transporter.close();
            res.status(500).end();
        } else {
            console.log(info);
            console.log('Message sent successfully!');
            transporter.close();
            res.status(200).end();
        }
    });

    // GA実行
    visitor.event("お問い合わせ", "お問い合わせ").send();
});

module.exports = router;
