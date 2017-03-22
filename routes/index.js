const express = require('express');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const router = express.Router();
const moment = require("moment");

// 営業日取得
moment.locale('ja', {weekdays: ["日","月","火","水","木","金","土"]});
let targetWeekday = ['土', '日'];
var businessDays = [];
for (var i = 1; i < 90; i++) {
    var date = moment().add(i, 'days');
    var weekday = date.format('dddd');
    if (targetWeekday.indexOf(weekday) > -1) {
        businessDays.push(date.format('MM月DD日dddd曜日'));
    }
}
var businessHours = [];
for (var i = 1; i < 25; i++) {
    businessHours.push(i + '時~');
}

let transporter = nodemailer.createTransport( smtpTransport({
    host : process.env.EMAIL_HOST,
    port : 587,
    auth : {
        user : process.env.EMAIL_USER, // メールアドレス
        pass : process.env.EMAIL_PASS // メールアドレスパスワード
    }
}));

// デフォルトルーティング
router.get('/', function (req, res) {
    res.render('index', { dates: businessDays, times: businessHours });
});

// 申し込みメール送信
router.post('/submit', function (req, res) {
    // Message object
    var mes = req.body
    let message = {
        from: 'fameal <' + process.env.EMAIL_USER + '>',
        to: mes.email,
        bcc: process.env.EMAIL_USER,
        subject: '[fameal]予約完了',
        text: mes.name + '様の予約日時は' + mes.date + 'です。'
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
});

// お問い合わせメール送信
router.post('/submitQuestion', function (req, res) {
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
});

module.exports = router;
