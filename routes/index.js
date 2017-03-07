const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

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
    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);
    var sess = req.session
    if (sess.body != null) {
        console.log('session loaded at top')
        res.render('index', { message: sess.body.message, errors: {} });
    } else {
        console.log('there is no session at top')
        res.render('index', { message: {}, errors: {} });
    }
});

// 確認画面へ
router.post('/confirm', function (req, res) {
    // sessionに入れる
    var sess = req.session
    sess.body = {message: req.body}
    // validation
    req.assert('word1', 'word1を入力してください').notEmpty();
    req.assert('word2', 'word2は数字で入力してください').isInt();
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
        to: 'Hoge Fuga <koheiebato@gmail.com>',
        // Subject of the message
        subject: 'Nodemailer is unicode friendly ✔ #', //
        // plaintext body
        text: mes.word1 + '+' + mes.word2
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
