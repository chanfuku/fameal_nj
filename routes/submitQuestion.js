const express = require('express');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const router = express.Router();
const os = require("os");
const ua = require('universal-analytics');
const firebase = require("firebase");
const moment = require("moment");
const IncomingWebhook = require('@slack/client').IncomingWebhook;

let transporter = nodemailer.createTransport( smtpTransport({
    host : process.env.EMAIL_HOST,
    port : 587,
    auth : {
        user : process.env.EMAIL_USER, // メールアドレス
        pass : process.env.EMAIL_PASS // メールアドレスパスワード
    }
}));

let visitor = ua('UA-97242923-1');

let url = process.env.SLACK_WEBHOOK_URL || '';
let webhook = new IncomingWebhook(url);

// お問い合わせメール送信
router.post('/', function (req, res) {
    // Message object
    // 改行コード取得
    var eol = os.EOL;
    var mes = req.body
    var tel = '';
    if (mes.tel != null) {
        tel = `■電話番号` + eol + `${mes.tel}` + eol;
    }
    let message = {
        from: 'fameal <' + process.env.EMAIL_USER + '>',
        to: mes.email,
        bcc: process.env.EMAIL_USER,
        subject: '［FAMEAL］お問い合わせの受付',
        text:
            `${mes.name}様` + eol + eol +
            `この度は、FAMEALにお問い合わせいただき、` + eol +
            `誠にありがとうございます。` + eol +
            `ご入力いただきました内容は以下のとおりです。` + eol +
            `-------------------------` + eol +
            `■お問い合わせ内容` + eol +
            `${mes.questionType}` + eol +
            `■お名前` + eol +
            `${mes.name}` + eol +
            `■メールアドレス` + eol +
            `${mes.email}` + eol + tel +
            `■内容詳細` + eol +
            `${mes.detail}` + eol + eol +
            `-------------------------` + eol + eol +
            `追ってご連絡を差し上げますので、` + eol +
            `少々おまちください。` + eol +
            `ご連絡には多少お日にちをいただく事がございます。` + eol +
            `予めご了承お願いいたします。` + eol + eol +
            `※このメールに心あたりが無い場合は、` + eol +
            `誠に恐れ入りますが、破棄していただけますようお願いいたします。` + eol + eol +
            `-----------------` + eol +
            `運営：simdy`
    };
    // firebaseに保存
    send_question_firebase(mes);

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
            webhook.send(mes.name + '様からの「問い合わせ」がありました。メールを確認してください。', function(err, header, statusCode, body) {
                if (err) {
                    console.log('Error:', err);
                } else {
                    console.log('Received', statusCode, 'from Slack');
                }
            });
            transporter.close();
            res.status(200).end();
        }
    });

    // GA実行
    visitor.event("お問い合わせ", "お問い合わせ").send();
});

function send_question_firebase (mes) {
    var database = firebase.database();
    database.ref('questions/' + mes.name).push({
      questionType: mes.questionType,
      username: mes.name,
      email: mes.email,
      detail: mes.detail,
      created_at: moment().format('YYYYMMMMDo,h:mm:ss a')
    });
}

module.exports = router;
