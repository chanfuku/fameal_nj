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
        res.render('index', { message: sess.body.message, errors: {} });
    } else {
        console.log('there is no session at top')
        res.render('index', { message: {dates: businessDays }, errors: {} });
    }
});

// 確認画面へ
router.post('/confirm', function (req, res) {
    // sessionに入れる
    var sess = req.session
    sess.body = {message: req.body}
    // validation
    req.assert('name', 'お名前を入力してください').notEmpty();
    req.assert('address', '住所を入力してください').notEmpty();
    req.assert('tel', '電話番号を入力してください').notEmpty();
    req.assert('email', 'メールアドレスを入力してください').notEmpty();
    req.assert('attendNum', '参加人数を入力してください').isInt();
    req.assert('date', '希望日時を入力してください').notEmpty();
    req.assert('note', '希望日時を入力してください').notEmpty();
    var errors = req.validationErrors();
    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            console.log('validation error');
            res.render('index', { message: req.body, errors: result.array() });
        } else {
            res.render('confirm', { message: req.body });
        }
    });
});

// submitメール送信
router.get('/submit', function (req, res) {
    // Message object
    var mes = req.session.body.message
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
            return;
        }
        console.log('Message sent successfully!');
        console.log('Server responded with "%s"', info.res);
        transporter.close();
    });
    req.session.destroy();
    res.redirect(302, "/");
});

module.exports = router;
