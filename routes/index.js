const express = require('express');
const nodemailer = require('nodemailer');
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

// Create a SMTP transporter object
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// デフォルトルーティング
router.get('/', function (req, res) {
    var sess = req.session
    if (sess.body != null) {
        console.log('session loaded at top')
        res.render('index', { message: sess.body.message, dates: businessDays, times: businessHours, errors: {} });
    } else {
        console.log('there is no session at top')
        res.render('index', { message: {}, dates: businessDays, times: businessHours, errors: {} });
    }
});

// 再入力画面(確認画面からの戻り)
router.get('/input', function (req, res) {
    var sess = req.session
    if (sess.body != null) {
        console.log('session loaded at input')
        res.render('input', { message: sess.body.message, dates: businessDays, times: businessHours, errors: {} });
    } else {
        console.log('there is no session at input')
        res.render('input', { message: {}, dates: businessDays, times: businessHours, errors: {} });
    }
});

// 確認画面へ
router.post('/confirm', function (req, res) {
    // sessionに入れる
    var sess = req.session
    sess.body = {message: req.body}
    // validation
    req.assert('name', 'お名前を入力してください').notEmpty();
    req.assert('age', '年齢を入力してください').isInt();
    req.assert('address', '住所を入力してください').notEmpty();
    req.assert('tel', '電話番号を入力してください').notEmpty();
    req.assert('email', 'メールアドレスを入力してください').notEmpty();
    req.assert('date', '希望日時を入力してください').notEmpty();
    req.assert('time', '時間を入力してください').notEmpty();
    req.assert('attendNum', '参加人数を入力してください').isInt();
    var errors = req.validationErrors();
    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            console.log('validation error');
            res.render('input', { message: req.body, dates: businessDays, times: businessHours, errors: result.array() });
        } else {
            res.render('confirm', { message: req.body });
        }
    });
});

// submitメール送信
router.post('/submit', function (req, res) {
    // Message object
    var mes = req.body
    let message = {
        // Comma separated list of recipients
        to: mes.email,
        // Subject of the message
        subject: '[fameal]予約完了', //
        // plaintext body
        text: mes.name + '様の予約日時は' + mes.date + 'です。'
    };
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
        }
        console.log('Message sent successfully!');
        transporter.close();
        console.log(info);
        consoloe.log(message);
        return info.response;
    });
});

module.exports = router;
